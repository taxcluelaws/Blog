import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';

export default function BlogPage({ blogs }) { return <Layout><section className="container-default py-14"><h1 className="section-title">Tax & Compliance Blog</h1><div className="space-y-4 mt-6">{blogs.map((b)=><Link key={b.slug} href={`/blog/${b.slug}`} className="card p-6 block"><h2 className="font-semibold text-xl">{b.title}</h2><p className="mt-2">{b.metaDescription}</p></Link>)}</div></section></Layout>; }
export async function getServerSideProps(){await dbConnect(); const blogs=await Blog.find({published:true}).sort({createdAt:-1}).lean(); return {props:{blogs:JSON.parse(JSON.stringify(blogs))}};}
