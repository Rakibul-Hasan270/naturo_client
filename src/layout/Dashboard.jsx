import { Link, NavLink, Outlet } from "react-router-dom";
import { MdLocalShipping, MdMenu, MdShoppingBag } from "react-icons/md";
import { FaPowerOff, FaShoppingCart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import group5 from '../assets/DashboardLogo/Group5.png'
import { MdPayment } from "react-icons/md";


const Dashboard = () => {

    const links =
        <div>
            <li className="list-none mb-4">
                <NavLink to="dashboard-home" className={({ isActive }) => `text-[14px] font-medium flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? "bg-[#F8FAFF] shadow text-[#2A4178]" : "text-[#A7B7DD]"}`} >
                    <MdDashboard /> Dashboard
                </NavLink>
            </li>

            <li className="list-none mb-4">
                <NavLink to="order" className={({ isActive }) => `text-[14px] font-medium flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? "bg-[#F8FAFF] shadow text-[#2A4178]" : "text-[#A7B7DD]"}`} >
                    <FaShoppingCart /> Order
                </NavLink>
            </li>

            <li className="list-none mb-4">
                <NavLink to="products" className={({ isActive }) => `text-[14px] font-medium flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? "bg-[#F8FAFF] shadow text-[#2A4178]" : "text-[#A7B7DD]"}`} >
                    <MdShoppingBag /> Products
                </NavLink>
            </li>

            <li className="list-none mb-4">
                <NavLink to="shipping" className={({ isActive }) => `text-[14px] font-medium flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? "bg-[#F8FAFF] shadow text-[#2A4178]" : "text-[#A7B7DD]"}`} >
                    <MdLocalShipping /> Shipping
                </NavLink>
            </li>

            <li className="list-none mb-4">
                <NavLink to="payment" className={({ isActive }) => `text-[14px] font-medium flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? "bg-[#F8FAFF] shadow text-[#2A4178]" : "text-[#A7B7DD]"}`} >
                    <MdPayment /> Payment
                </NavLink>
            </li>

            <li className="list-none mb-4">
                <NavLink to="setting" className={({ isActive }) => `text-[14px] font-medium flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? "bg-[#F8FAFF] shadow text-[#2A4178]" : "text-[#A7B7DD]"}`} >
                    <IoMdSettings /> Setting
                </NavLink>
            </li>
        </div>


    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto md:mt-10">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar bg-base-100 flex justify-between lg:hidden">
                    <div className="flex items-center gap-2">
                        <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                            <MdMenu size={24} />
                        </label>
                    </div>
                </div>

                <div className="p-4 bg-[#F8F7FC]">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side bg-[#E5E5E5]">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <div className="md:w-72 bg-[#FFFFFF] p-10">
                    <div className="flex justify-center mb-6 md:mb-11">
                        <Link to='/' className="text-5xl text-black">
                            <FaPowerOff />
                        </Link>
                    </div>
                    {links}
                    <div className="w-[140px]">
                        <div>
                            <h2 className="text-gray-600 text-[14px] font-semibold mb-6">
                                Customer Support
                            </h2>
                            <p className="text-[12px] text-[#BFBFBF] font-normal">
                                Ask your query, place requests or important issues. Our support
                                team will contact you 24/7.
                            </p>
                        </div>
                        <div className="mt-7">
                            <img src={group5} alt="Support" />
                        </div>
                        <p className="text-[12px] font-medium text-[#B9B9B9] mt-10">
                            Terms & Services • Privacy Policy
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;