import {Inter} from 'next/font/google';
import '@/app/globals.css';
import Menu from '@/components/Menu';
import Head from "next/head";
import {AuthProvider, ProtectRoute} from "@/contexts/auth";
import {ThemeProvider} from "next-themes";
import SiteFooter from "@/components/Footer";

const inter = Inter({subsets: ['latin']});

function Application({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>JJ Shop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <div className={`h-screen ${inter.className}`}>
        <ThemeProvider attribute="class">
          <AuthProvider>
            <ProtectRoute>
              <div
                className="container mx-auto p-5 dark:bg-gray-800 bg-white dark:text-gray-200 text-black">
                <Menu/>
                <div className="mx-auto">
                  <Component {...pageProps} />
                </div>
                <SiteFooter/>
              </div>
            </ProtectRoute>
          </AuthProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default Application;