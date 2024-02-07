import React from 'react';
import { Footer } from 'flowbite-react';

const SiteFooter = () => {
  return (
    <Footer className="mx-auto p-4 font-mediu">
      <Footer.Copyright href="#" by="JJ SHOPsss" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default SiteFooter;