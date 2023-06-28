import { NextPage } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

const NavbarLayouts: NextPage<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto">
      <div className="flex flex-col grow">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default NavbarLayouts;
