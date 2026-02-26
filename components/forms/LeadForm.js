import { useState } from 'react';

export default function LeadForm({ service = '' }) {
  const [state, setState] = useState({ name: '', email: '', phone: '', service, message: '', website: '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(state) });
    const data = await res.json();
    setMsg(res.ok ? 'Thanks! Our compliance team will call you shortly.' : data.message);
    if (res.ok) setState({ name: '', email: '', phone: '', service, message: '', website: '' });
  };

  return (
    <form onSubmit={submit} className="card p-6 space-y-3">
      <h3 className="text-xl font-semibold">Get Expert Assistance</h3>
      {['name', 'email', 'phone', 'message'].map((f) => (
        <input key={f} className="w-full border rounded-lg p-3" placeholder={f[0].toUpperCase() + f.slice(1)} value={state[f]} onChange={(e) => setState({ ...state, [f]: e.target.value })} required={f !== 'email'} />
      ))}
      <input className="hidden" tabIndex={-1} autoComplete="off" value={state.website} onChange={(e)=>setState({...state, website:e.target.value})} />
      <button className="bg-primary text-white px-5 py-3 rounded-lg w-full">Submit Inquiry</button>
      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}
