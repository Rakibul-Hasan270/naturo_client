import { Link, Outlet } from "react-router-dom";
import MiniNavbar from "../pages/MiniNavbar/MiniNavbar";
import Navbar from "../pages/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import { LuLayoutDashboard } from "react-icons/lu";

const Main = () => {

    return (
        <div className="bg-white text-[#222222]">
            <MiniNavbar></MiniNavbar>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

            {/* -------- Fixed Side Button -------- */}
            <Link to="/dashboard/dashboard-home"
                className=" fixed bottom-6 right-6 bg-red-600  flex items-center gap-3  text-white p-4 shadow-lg hover:bg-green-700 transition-all duration-300z-50"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <LuLayoutDashboard size={20} /> Dashboard
            </Link>
        </div>
    );
};

export default Main;