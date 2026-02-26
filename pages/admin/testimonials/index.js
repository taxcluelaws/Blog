import { useState } from 'react';
import { authHeaders } from '@/lib/adminClient';

export default function AdminTestimonials(){
  const [form,setForm]=useState({name:'',company:'',feedback:''}); const [msg,setMsg]=useState('');
  const submit=async(e)=>{e.preventDefault(); await fetch('/api/testimonials',{method:'POST',headers:authHeaders(),body:JSON.stringify(form)}); setMsg('Saved');};
  return <div className="container-default py-10"><h1 className="section-title">Manage Testimonials</h1><form onSubmit={submit} className="card p-6 mt-5 space-y-3">{['name','company','feedback'].map(f=><input key={f} className="w-full border p-2" placeholder={f} onChange={e=>setForm({...form,[f]:e.target.value})} required/>)}<button className="bg-primary text-white px-4 py-2 rounded">Add</button>{msg}</form></div>;
}
