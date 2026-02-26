import { useEffect, useState } from 'react';
import { authHeaders } from '@/lib/adminClient';

export default function AdminServices(){
  const [services,setServices]=useState([]); const [form,setForm]=useState({title:'',overview:'',eligibility:'',pricing:''});
  const load=()=>fetch('/api/services').then(r=>r.json()).then(setServices); useEffect(load,[]);
  const create=async(e)=>{e.preventDefault(); await fetch('/api/services',{method:'POST',headers:authHeaders(),body:JSON.stringify({...form,documentsRequired:['PAN card','Aadhaar card'],processSteps:['Consultation','Document submission','Final filing']})}); setForm({title:'',overview:'',eligibility:'',pricing:''}); load();};
  return <div className="container-default py-10"><h1 className="section-title">Manage Services</h1><form onSubmit={create} className="card p-5 mt-5 space-y-2">{['title','overview','eligibility','pricing'].map(f=><input key={f} className="w-full border p-2" placeholder={f} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})} required={f==='title'}/>)}<button className="bg-primary text-white px-4 py-2 rounded">Create Service</button></form><div className="mt-6 space-y-3">{services.map(s=><div key={s._id} className="card p-4">{s.title}</div>)}</div></div>;
}
