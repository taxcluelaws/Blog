import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { dbConnect } from '@/lib/db';
import Service from '@/models/Service';

export default function ServicesPage({ services }) {
  return <Layout><section className="container-default py-14"><h1 className="section-title">Business Compliance Services</h1><div className="grid md:grid-cols-2 gap-5 mt-6">{services.map((s)=><Link key={s.slug} href={`/services/${s.slug}`} className="card p-6"><h2 className="font-semibold text-lg">{s.title}</h2><p className="mt-2 text-gray-700">{s.overview}</p></Link>)}</div></section></Layout>;
}

export async function getServerSideProps() { await dbConnect(); const services = await Service.find({}).lean(); return { props: { services: JSON.parse(JSON.stringify(services)) } }; }
