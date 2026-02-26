import Layout from '@/components/layout/Layout';
import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';
import Link from 'next/link';

export default function BlogDetail({ blog, related }) {
  return <Layout><article className="container-default py-14"><h1 className="section-title">{blog.title}</h1><p className="text-sm text-gray-500 mt-2">{new Date(blog.createdAt).toLocaleDateString('en-IN')}</p><div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{__html: blog.content}} /><h3 className="text-xl font-semibold mt-10">Related Posts</h3><div className="grid md:grid-cols-2 gap-4 mt-4">{related.map((p)=><Link key={p.slug} href={`/blog/${p.slug}`} className="card p-4">{p.title}</Link>)}</div></article></Layout>;
}
export async function getServerSideProps({params}){await dbConnect(); const blog=await Blog.findOne({slug:params.slug}).lean(); if(!blog)return {notFound:true}; const related=await Blog.find({category:blog.category,slug:{$ne:blog.slug}}).limit(2).lean(); return {props:{blog:JSON.parse(JSON.stringify(blog)),related:JSON.parse(JSON.stringify(related))}};}
