import {Inter} from "next/font/google";
import "@/app/globals.css";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <head>
      <title>Title Goes Here</title>
    </head>
    <body className={inter.className}>
    <Menu/>
    {children}
    <Footer/>
    </body>
    </html>
  );
}
