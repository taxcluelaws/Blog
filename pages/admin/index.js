import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authHeaders } from '@/lib/adminClient';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ leads: 0, blogs: 0, services: 0, monthly: 0 });
  useEffect(() => {
    const load = async () => {
      const [leads, blogs, services] = await Promise.all([
        fetch('/api/leads', { headers: authHeaders() }).then((r) => r.json()),
        fetch('/api/blogs').then((r) => r.json()),
        fetch('/api/services').then((r) => r.json())
      ]);
      const month = new Date().getMonth();
      setStats({ leads: leads.length, blogs: blogs.length, services: services.length, monthly: leads.filter((l) => new Date(l.createdAt).getMonth() === month).length });
    };
    load();
  }, []);
  return <div className="container-default py-10"><h1 className="section-title">Admin Dashboard</h1><div className="grid md:grid-cols-4 gap-4 mt-6">{Object.entries(stats).map(([k,v])=><div key={k} className="card p-5"><p className="text-sm text-gray-500">{k}</p><p className="text-2xl font-bold">{v}</p></div>)}</div><div className="mt-8 flex flex-wrap gap-3">{['blogs','services','leads','testimonials','faqs','settings'].map((p)=><Link key={p} href={`/admin/${p}`} className="px-4 py-2 border rounded">Manage {p}</Link>)}</div></div>;
}
