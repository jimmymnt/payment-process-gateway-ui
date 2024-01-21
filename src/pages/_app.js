import {Inter} from 'next/font/google';
import '@/app/globals.css';
import Menu from '@/components/Menu';

const inter = Inter({subsets: ['latin']});

function MyApp({Component, pageProps}) {
  return (
    <div className={inter.className}>
      <Menu/>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;