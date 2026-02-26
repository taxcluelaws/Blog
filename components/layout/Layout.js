import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header className="border-b">
        <div className="container-default flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-primary">TaxClue</Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/services">Services</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/admin/login">Admin</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-black text-white mt-16">
        <div className="container-default py-10 grid md:grid-cols-3 gap-6 text-sm">
          <div><h4 className="font-semibold">TaxClue</h4><p>Your Compliance Partner for businesses across India.</p></div>
          <div><h4 className="font-semibold">Compliance Links</h4><p>Privacy Policy · Terms of Service · Refund Policy</p></div>
          <div><h4 className="font-semibold">Contact</h4><p>support@taxclue.net · +91 98765 43210</p></div>
        </div>
      </footer>
    </div>
  );
}
