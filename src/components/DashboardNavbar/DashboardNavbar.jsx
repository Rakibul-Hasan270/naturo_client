import { CiMenuKebab } from "react-icons/ci";
import { FaMessage, FaUser } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { IoCaretDownSharp, IoCaretUpSharp, IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
    return (
        <div>
            <div className="w-full bg-white shadow-md rounded-xl p-4 md:p-6 text-black space-y-4 lg:space-y-0">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
                    <div className="flex items-center justify-between w-full lg:w-auto">
                        <div>
                            <p className="font-medium text-gray-700 text-sm md:text-base">Total Revenue</p>
                            <div className="flex flex-wrap items-center gap-3 md:gap-4">
                                <p className="text-2xl md:text-3xl font-bold">& 45,365.00</p>
                                <p className="text-red-600 flex items-center gap-1.5 font-medium text-sm md:text-base">
                                    <IoCaretDownSharp /> $1,294
                                </p>
                                <p className="text-green-600 flex items-center gap-1.5 font-medium text-sm md:text-base">
                                    <IoCaretUpSharp /> $1,294
                                </p>
                            </div>
                        </div>

                        {/* ---- Mobile Dropdown ---- */}
                        <div className="relative lg:hidden">
                            <details className="dropdown dropdown-end">
                                <summary className="btn btn-sm px-3 py-1 rounded-lg">
                                    <CiMenuKebab />
                                </summary>
                                <ul className="menu dropdown-content z-1 p-2 shadow bg-white rounded-box w-44 mt-2">

                                    <Link to=''><span className="flex items-center gap-[7px]"><FaUser></FaUser>Profile</span></Link>

                                    <Link to=''><span className="flex items-center gap-[7px]"><FaMessage></FaMessage>Message</span></Link>

                                    <Link to=''><span className="flex items-center gap-[7px]"><IoNotifications></IoNotifications>Notification</span></Link>
                                </ul>
                            </details>
                        </div>
                    </div>

                    {/* --- Middle: Search (Moves up on lg) --- */}
                    <div className="w-full lg:w-[350px] order-2 lg:order-none">
                        <label className="relative block w-full text-gray-500">
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.3-4.3" />
                            </svg>
                            <input
                                type="search"
                                required
                                placeholder="Search"
                                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-700 bg-white text-gray-700 text-sm md:text-base"
                            />
                        </label>
                    </div>

                    {/* --- Right: Icons + Profile (only for lg+) --- */}
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="relative p-2 text-2xl cursor-pointer transition-transform duration-300 hover:scale-110">
                            <FaMessage className="text-[#3692EB]" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                        </div>

                        <div className="relative p-2 text-2xl cursor-pointer transition-transform duration-300 hover:scale-110">
                            <IoIosNotifications className="text-[#3692EB] text-3xl" />
                            <span className="absolute top-1.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                        </div>

                        <img
                            className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
                            src="https://i.ibb.co.com/GQg56Ct7/Ellipse-1.png"
                            alt="Profile"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;