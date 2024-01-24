import {Inter} from 'next/font/google';
import '@/app/globals.css';
import Menu from '@/components/Menu';
import Footer from "@/components/Footer";
import Head from "next/head";

const inter = Inter({subsets: ['latin']});

function Application({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>JJ Shop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <div className={`h-screen ${inter.className}`}>
        <Menu/>
        <Component {...pageProps} />
        <Footer/>
      </div>
    </>
  );
}

export default Application;