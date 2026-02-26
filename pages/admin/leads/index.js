import { useEffect, useState } from 'react';
import { authHeaders } from '@/lib/adminClient';

const csvify = (rows) => 'Name,Email,Phone,Service,Status\n' + rows.map((r) => [r.name, r.email, r.phone, r.service, r.status].join(',')).join('\n');

export default function AdminLeads(){
  const [leads,setLeads]=useState([]); const [service,setService]=useState('');
  const load=()=>fetch(`/api/leads${service?`?service=${service}`:''}`,{headers:authHeaders()}).then(r=>r.json()).then(setLeads); useEffect(load,[service]);
  const update=async(id,status)=>{await fetch(`/api/leads/${id}`,{method:'PUT',headers:authHeaders(),body:JSON.stringify({status})}); load();};
  const exportCsv=()=>{const blob=new Blob([csvify(leads)],{type:'text/csv'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='leads.csv'; a.click();};
  return <div className="container-default py-10"><h1 className="section-title">Lead Management</h1><div className="mt-4 flex gap-3"><input className="border p-2" placeholder="Filter by service" value={service} onChange={e=>setService(e.target.value)} /><button onClick={exportCsv} className="border px-3">Export CSV</button></div><div className="mt-6 space-y-3">{leads.map(l=><div key={l._id} className="card p-4 flex justify-between"><div><p className="font-semibold">{l.name} - {l.service}</p><p className="text-sm">{l.phone} | {l.email}</p></div><select value={l.status} onChange={e=>update(l._id,e.target.value)}><option>New</option><option>Contacted</option><option>Converted</option></select></div>)}</div></div>;
}
