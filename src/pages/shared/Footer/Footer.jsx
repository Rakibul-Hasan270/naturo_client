import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhone } from "react-icons/fa6";
import { MdEmail, MdLocationPin } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="bg-[#003315] text-[#1FB757]">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* --- Left Section --- */}
                <div>
                    <h2 className="text-3xl font-bold text-green-400 mb-2">Naturo</h2>
                    <p className="text-sm font-semibold mb-4">BACK TO NATURE</p>

                    <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                            <FaPhone className="text-green-400" /> Hotline 24/7: <span className="font-semibold">09639812525</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <MdLocationPin className="text-green-400 mt-1" />
                            Level-5, Noor Tower, 110 Bir Uttam CR Dutta Rd, Dhaka 1205
                        </p>
                        <p className="flex items-center gap-2">
                            <MdEmail className="text-green-400" /> naturo@gmail.com
                        </p>
                    </div>
                </div>

                {/* --- Middle Section --- */}
                <div className="md:mx-auto">
                    <h3 className="text-xl font-bold mb-4 text-green-400">Useful Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-400">About Us</a></li>
                        <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-green-400">Terms and Conditions</a></li>
                        <li><a href="#" className="hover:text-green-400">Return and Refund</a></li>
                        <li><a href="#" className="hover:text-green-400">Cookie Policy</a></li>
                        <li><a href="#" className="hover:text-green-400">Sitemap</a></li>
                    </ul>
                </div>

                {/* --- Right Section --- */}
                <div>
                    <h3 className="text-xl font-bold mb-4 text-green-400">Help Center</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-400">Order Tracking</a></li>
                        <li><a href="#" className="hover:text-green-400">Contact Us</a></li>
                        <li><a href="#" className="hover:text-green-400">How to Order</a></li>
                        <li><a href="#" className="hover:text-green-400">Product Returns</a></li>
                        <li><a href="#" className="hover:text-green-400">FAQ</a></li>
                    </ul>
                </div>
            </div>

            {/* --- Social Media --- */}
            <div className="border-t border-gray-700 mt-6 pt-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400 text-center md:text-left">
                        © 2025 <span className="text-green-400 font-semibold">Naturo</span>. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition"><FaFacebookF /></a>
                        <a href="#" className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition"><FaInstagram /></a>
                        <a href="#" className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition"><FaTwitter /></a>
                        <a href="#" className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;