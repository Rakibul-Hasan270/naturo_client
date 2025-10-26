import { IoCaretDownSharp, IoCaretUpSharp, IoNotifications } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { FaMessage, FaUser } from "react-icons/fa6";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine } from "react-icons/ri";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import img from '../../../assets/DashboardLogo/Vector.png'
import img1 from '../../../assets/DashboardLogo/Vector (1).png'
import img2 from '../../../assets/DashboardLogo/Vector (2).png'
import DashboardNavbar from "../../../components/DashboardNavbar/DashboardNavbar";


const DashboardHome = () => {
    const data = [
        { name: "Mon", previous: 10, current: 10 },
        { name: "Tue", previous: 20, current: 25 },
        { name: "Wed", previous: 15, current: 20 },
        { name: "Thu", previous: 30, current: 20 },
        { name: "Fri", previous: 45, current: 50 },
        { name: "Sat", previous: 50, current: 40 },
        { name: "Sun", previous: 50, current: 55 },
    ];

    return (
        <div className="space-y-6">
          <DashboardNavbar></DashboardNavbar>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ----- Shipped Orders ----- */}
                <div className="bg-gradient-to-r from-[#6BAAFC] to-[#305FEC] rounded-xl p-5 flex flex-col justify-between text-white shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
                    <p className="text-base font-medium tracking-wide">Shipped Orders</p>
                    <div className="flex items-center justify-between mt-2">
                        <img src={img} alt="Shipped Icon" className="object-contain" />
                        <p className="text-3xl font-bold">67</p>
                    </div>
                </div>

                {/* ----- Pending Orders ----- */}
                <div className="bg-gradient-to-r from-[#EF5E7A] to-[#D35385] rounded-xl p-5 flex flex-col justify-between text-white shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
                    <p className="text-base font-medium tracking-wide">Pending Orders</p>
                    <div className="flex items-center justify-between mt-2">
                        <img src={img1} alt="Pending Icon" className="object-contain" />
                        <p className="text-3xl font-bold">09</p>
                    </div>
                </div>

                {/* ----- New Orders ----- */}
                <div className="bg-gradient-to-r from-[#D623FE] to-[#A530F2] rounded-xl p-5 flex flex-col justify-between text-white shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
                    <p className="text-base font-medium tracking-wide">New Orders</p>
                    <div className="flex items-center justify-between mt-2">
                        <img src={img2} alt="New Icon" className="object-contain" />
                        <p className="text-3xl font-bold">35</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row w-full gap-4 text-black">
                {/* -------- First Column -------- */}
                <div className="w-full md:w-1/2 space-y-3">
                    <div className="bg-white p-6 rounded-xl shadow-md w-full space-y-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold">Inbox</h3>
                                <p className="text-xs text-gray-500">
                                    Group: <span className="font-medium text-gray-700">Support</span>
                                </p>
                            </div>
                            <button className="text-sm text-blue-600 font-medium hover:underline">
                                View details
                            </button>
                        </div>

                        <div className="flex justify-between items-center border-gray-300 border-b pb-2">
                            <p className="text-sm font-medium">Waiting for order #12345</p>
                            <p className="text-xs text-gray-500">4:39</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">Customer replied to ticket #6789</p>
                            <p className="text-xs text-gray-500">3:20</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md w-full space-y-5">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-xl font-semibold">Recently Activity</h3>
                            <button className="text-sm text-blue-600 font-medium hover:underline">
                                View details
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-gray-300 border-b pb-2">
                                <h2 className="flex items-center gap-2 text-sm font-medium">
                                    <AiFillCheckCircle className="text-blue-500 text-base" />
                                    Confirm order update
                                </h2>
                                <button className="text-xs bg-yellow-500 text-white px-3 py-1 rounded-full font-medium">
                                    URGENT
                                </button>
                            </div>

                            <div className="flex justify-between items-center border-gray-300 border-b pb-2">
                                <h2 className="flex items-center gap-2 text-sm font-medium">
                                    <RiCheckboxBlankCircleFill className="text-red-500 text-base" />
                                    Finish shipping update
                                </h2>
                                <button className="text-xs bg-yellow-500 text-white px-3 py-1 rounded-full font-medium">
                                    URGENT
                                </button>
                            </div>

                            <div className="flex justify-between items-center border-gray-300 border-b pb-2">
                                <h2 className="flex items-center gap-2 text-sm font-medium">
                                    <RiCheckboxBlankCircleLine className="text-gray-500 text-base" />
                                    Create new order
                                </h2>
                                <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-medium">
                                    NEW
                                </button>
                            </div>

                            <div className="flex justify-between items-center">
                                <h2 className="flex items-center gap-2 text-sm font-medium">
                                    <AiFillCheckCircle className="text-blue-500 text-base" />
                                    Update payment report
                                </h2>
                                <button className="text-xs bg-gray-400 text-white px-3 py-1 rounded-full font-medium">
                                    Default
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* -------- Second Column -------- */}
                <div className="w-full md:w-1/2">
                    <div className="bg-white p-6 rounded-xl shadow-md w-full h-[475px] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between border-gray-300 border-b pb-3 mb-4">
                            <div className="">
                                <h3 className="text-xl font-semibold">Today’s trends</h3>
                                <span className="text-xs text-gray-500">30 Sept 2021</span>
                            </div>
                            <div className="flex items-center text-xs font-semibold gap-2">
                                <p className="text-gray-400">__ Today </p>
                                <p className="text-gray-400">__ yesterday</p>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />

                                    {/* Default line */}
                                    <Line
                                        type="monotone"
                                        dataKey="previous"
                                        stroke="#888888"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                        activeDot={{ r: 5 }}
                                    />

                                    {/* Update line */}
                                    <Line
                                        type="monotone"
                                        dataKey="current"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DashboardHome;