import {Inter} from 'next/font/google';
import '@/app/globals.css';
import Menu from '@/components/Menu';
import Footer from "@/components/Footer";

const inter = Inter({subsets: ['latin']});

function Application({Component, pageProps}) {
  return (
    <div className={`${inter.className}`}>
      <Menu/>
      <Component {...pageProps} />
      <Footer/>
    </div>
  );
}

export default Application;