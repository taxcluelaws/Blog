import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) return setError(data.message);
    localStorage.setItem('token', data.token);
    router.push('/admin');
  };
  return <div className="min-h-screen grid place-items-center bg-gray-50"><form onSubmit={submit} className="card p-8 w-full max-w-md space-y-3"><h1 className="text-2xl font-bold">Admin Login</h1><input className="w-full border p-3 rounded" placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/><input type="password" className="w-full border p-3 rounded" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/><button className="w-full bg-primary text-white py-3 rounded">Sign In</button>{error&&<p className="text-red-600 text-sm">{error}</p>}</form></div>;
}
