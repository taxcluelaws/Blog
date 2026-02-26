import { useState } from 'react';
import { authHeaders } from '@/lib/adminClient';

export default function AdminSettings(){
  const [contact,setContact]=useState('support@taxclue.net, +91 98765 43210');
  const save=async()=>{await fetch('/api/settings',{method:'POST',headers:authHeaders(),body:JSON.stringify({key:'contact',value:contact})}); alert('Saved');};
  return <div className="container-default py-10"><h1 className="section-title">Settings</h1><div className="card p-6 mt-5"><label className="block text-sm">Contact Details</label><textarea className="w-full border p-3 mt-2" value={contact} onChange={e=>setContact(e.target.value)} /><button onClick={save} className="bg-primary text-white px-4 py-2 rounded mt-3">Save</button></div></div>;
}
