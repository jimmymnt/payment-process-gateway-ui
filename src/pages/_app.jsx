import {Inter} from 'next/font/google';
import '@/app/globals.css';
import Menu from '@/components/Menu';
import Footer from "@/components/Footer";
import Head from "next/head";
import {AuthProvider, ProtectRoute} from "@/contexts/auth";
import {ThemeProvider} from "next-themes";

const inter = Inter({subsets: ['latin']});

function Application({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>JJ Shop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <div className={`h-screen ${inter.className}`}>
        <AuthProvider>
          <ProtectRoute>
            <ThemeProvider attribute="class">
              <div className="font-[sans-serif]">
                <Menu/>

                <div className="max-w-screen-xl mx-auto px-4">
                  <Component {...pageProps} />
                </div>
                <Footer/>
              </div>
            </ThemeProvider>
          </ProtectRoute>
        </AuthProvider>
      </div>
    </>
  );
}

export default Application;