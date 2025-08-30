import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="w-full flex flex-col min-h-screen">
        <div className="w-full fixed top-0 left-0 z-50 flex flex-col">
          <NavBar />
        </div>
        <div className="w-full flex-1 pt-[36px]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
