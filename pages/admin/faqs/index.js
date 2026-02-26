import { useState } from 'react';
import { authHeaders } from '@/lib/adminClient';

export default function AdminFaqs(){const [q,setQ]=useState(''); const [a,setA]=useState('');
const submit=async(e)=>{e.preventDefault(); await fetch('/api/faqs',{method:'POST',headers:authHeaders(),body:JSON.stringify({question:q,answer:a,scope:'home'})}); setQ(''); setA('');};
return <div className="container-default py-10"><h1 className="section-title">Manage FAQs</h1><form onSubmit={submit} className="card p-6 mt-5 space-y-3"><input className="w-full border p-2" placeholder="Question" value={q} onChange={e=>setQ(e.target.value)}/><input className="w-full border p-2" placeholder="Answer" value={a} onChange={e=>setA(e.target.value)}/><button className="bg-primary text-white px-4 py-2 rounded">Add FAQ</button></form></div>;}
