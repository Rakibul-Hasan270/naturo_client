import { Outlet } from "react-router-dom";
import MiniNavbar from "../pages/MiniNavbar/MiniNavbar";
import Navbar from "../pages/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const Main = () => {
    
    return (
        <div className="bg-white text-[#222222]">
            <MiniNavbar></MiniNavbar>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;