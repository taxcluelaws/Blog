import '@/styles/globals.css';
import { Toaster } from '@/components/ui/Toaster';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
