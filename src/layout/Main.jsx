import { Outlet } from "react-router-dom";
import MiniNavbar from "../pages/MiniNavbar/MiniNavbar";
import Navbar from "../pages/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            <MiniNavbar></MiniNavbar>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;