import { Footer } from "flowbite-react";

const FooterNav = () => {
  return (
    <>
      <Footer
        container
        className="bg-white md:flex md:items-center md:justify-between shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4"
      >
        <Footer.Copyright href="#" by="FlowContact" year={2024} />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </>
  );
};

export default FooterNav;
