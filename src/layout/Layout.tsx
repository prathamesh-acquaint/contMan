import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className=" w-full">
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto mt-5 w-[90%] md:w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
