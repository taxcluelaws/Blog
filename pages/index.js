import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import LeadForm from '@/components/forms/LeadForm';
import { dbConnect } from '@/lib/db';
import Service from '@/models/Service';
import Blog from '@/models/Blog';
import Testimonial from '@/models/Testimonial';

export default function Home({ services, blogs, testimonials }) {
  return (
    <Layout>
      <Head>
        <title>TaxClue | Business Registration & Compliance Made Simple</title>
        <meta name="description" content="TaxClue helps Indian startups and SMEs with company registration, GST, trademark and end-to-end annual compliance." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'TaxClue',
          url: 'https://taxclue.net',
          slogan: 'Your Compliance Partner',
          areaServed: 'India',
          serviceType: 'Business Advisory & Compliance Consultancy'
        }) }} />

      </Head>
      <section className="container-default py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-primary font-semibold">Your Compliance Partner</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Business Registration & Compliance Made Simple</h1>
          <p className="mt-4 text-gray-700">Expert advisors for incorporation, licensing, tax registration and ongoing compliance tailored for Indian businesses.</p>
          <Link href="#lead" className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-lg">Start Your Registration</Link>
        </div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
          <h3 className="font-bold text-xl">Why Choose TaxClue</h3>
          <ul className="mt-4 space-y-2 text-gray-700"><li>• 1000+ successful registrations</li><li>• Dedicated compliance manager</li><li>• PAN India digital support</li></ul>
        </motion.div>
      </section>
      <section className="container-default py-12"><h2 className="section-title">Popular Services</h2><div className="grid md:grid-cols-3 gap-5 mt-6">{services.map((s)=><Link key={s.slug} href={`/services/${s.slug}`} className="card p-5"><h3 className="font-semibold">{s.title}</h3><p className="text-sm mt-2 text-gray-600">{s.overview?.slice(0,100)}...</p></Link>)}</div></section>
      <section className="container-default py-12"><h2 className="section-title">How It Works</h2><div className="grid md:grid-cols-3 gap-5 mt-6">{['Share requirements','Submit documents','Get registration done'].map((i,idx)=><div className="card p-6" key={i}><p className="text-primary font-bold">Step {idx+1}</p><h3 className="font-semibold">{i}</h3></div>)}</div></section>
      <section className="container-default py-12"><h2 className="section-title">Client Testimonials</h2><div className="grid md:grid-cols-3 gap-5 mt-6">{testimonials.map((t)=><div key={t._id} className="card p-5"><p>“{t.feedback}”</p><p className="mt-3 text-sm font-semibold">{t.name}, {t.company}</p></div>)}</div></section>
      <section className="container-default py-12"><h2 className="section-title">Insights from TaxClue</h2><div className="grid md:grid-cols-3 gap-5 mt-6">{blogs.map((b)=><Link key={b.slug} href={`/blog/${b.slug}`} className="card p-5"><h3 className="font-semibold">{b.title}</h3><p className="text-sm mt-2">{b.metaDescription}</p></Link>)}</div></section>
      <section id="lead" className="container-default py-12"><LeadForm /></section>
    </Layout>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const [services, blogs, testimonials] = await Promise.all([
    Service.find({}).limit(6).lean(),
    Blog.find({ published: true }).sort({ createdAt: -1 }).limit(3).lean(),
    Testimonial.find({}).limit(3).lean()
  ]);
  return { props: { services: JSON.parse(JSON.stringify(services)), blogs: JSON.parse(JSON.stringify(blogs)), testimonials: JSON.parse(JSON.stringify(testimonials)) } };
}
