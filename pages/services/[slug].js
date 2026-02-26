import Layout from '@/components/layout/Layout';
import LeadForm from '@/components/forms/LeadForm';
import { dbConnect } from '@/lib/db';
import Service from '@/models/Service';

export default function ServiceDetail({ service }) {
  return <Layout><section className="container-default py-14"><h1 className="section-title">{service.title}</h1><p className="mt-4">{service.overview}</p><div className="grid md:grid-cols-2 gap-8 mt-8"><div className="space-y-5"><div><h3 className="font-semibold">Eligibility</h3><p>{service.eligibility}</p></div><div><h3 className="font-semibold">Documents Required</h3><ul>{service.documentsRequired?.map((d)=><li key={d}>• {d}</li>)}</ul></div><div><h3 className="font-semibold">Process</h3><ol>{service.processSteps?.map((p)=><li key={p}>{p}</li>)}</ol></div><div><h3 className="font-semibold">Pricing</h3><p>{service.pricing || 'Contact us for customised pricing.'}</p></div></div><LeadForm service={service.title} /></div></section></Layout>;
}

export async function getServerSideProps({ params }) { await dbConnect(); const service = await Service.findOne({ slug: params.slug }).lean(); if (!service) return { notFound: true }; return { props: { service: JSON.parse(JSON.stringify(service)) } }; }
