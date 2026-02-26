import { useEffect, useState } from 'react';
import { authHeaders } from '@/lib/adminClient';

export default function AdminBlogs(){
  const [blogs,setBlogs]=useState([]); const [form,setForm]=useState({title:'',content:'',metaDescription:'',category:'Compliance'});
  const load=()=>fetch('/api/blogs').then(r=>r.json()).then(setBlogs); useEffect(load,[]);
  const create=async(e)=>{e.preventDefault(); await fetch('/api/blogs',{method:'POST',headers:authHeaders(),body:JSON.stringify(form)}); setForm({title:'',content:'',metaDescription:'',category:'Compliance'}); load();};
  const del=async(id)=>{await fetch(`/api/blogs/${id}`,{method:'DELETE',headers:authHeaders()}); load();};
  return <div className="container-default py-10"><h1 className="section-title">Manage Blogs</h1><form onSubmit={create} className="card p-5 mt-5 space-y-2">{['title','category','metaDescription','content'].map(f=><input key={f} className="w-full border p-2" placeholder={f} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})} required={f==='title'||f==='content'}/>)}<button className="bg-primary text-white px-4 py-2 rounded">Create Blog</button></form><div className="mt-6 space-y-3">{blogs.map(b=><div key={b._id} className="card p-4 flex justify-between"><p>{b.title}</p><button onClick={()=>del(b._id)} className="text-red-600">Delete</button></div>)}</div></div>;
}
