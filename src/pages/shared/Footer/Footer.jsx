import { FaPhone } from "react-icons/fa6";
import { MdEmail, MdLocationPin } from "react-icons/md";
import logo from '../../../assets/Logo/logo.png';
import fb from '../../../assets/sociaIcon/fb.png'
import whats from '../../../assets/sociaIcon/whats.png'

const Footer = () => {
    return (
        <footer className="bg-[#003315] text-[#1FB757]">
            <div className="max-w-7xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {/* --- Left Section --- */}
                <div>
                    <img className="md:-mt-8" src={logo} alt="" />
                    <p className="font-bold mb-8">Naturo - <span className="font-medium">BACK TO NATURE</span></p>

                    <div className="space-y-2">
                        <p className="flex items-center gap-2">
                            <FaPhone className="" /> Hotline 24/7: <span className="font-semibold text-2xl">09639812525</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <MdLocationPin className=" mt-1" />
                            Level-5, Noor Tower, 110 Bir Uttam CR Dutta Rd, Dhaka 1205
                        </p>
                        <p className="flex items-center gap-2">
                            <MdEmail className="" /> naturo@gmail.com
                        </p>
                    </div>
                </div>

                {/* --- Middle Section --- */}
                <div className="md:mx-auto">
                    <h3 className="text-xl font-bold mb-4">Useful Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="">About Us</a></li>
                        <li><a href="#" className="">Privacy Policy</a></li>
                        <li><a href="#" className="">Terms and Conditions</a></li>
                        <li><a href="#" className="">Return and Refund</a></li>
                        <li><a href="#" className="">Cookie Policy</a></li>
                        <li><a href="#" className="">Sitemap</a></li>
                    </ul>
                </div>

                {/* --- Right Section --- */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Help Center</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="">Order Tracking</a></li>
                        <li><a href="#" className="">Contact Us</a></li>
                        <li><a href="#" className="">How to Order</a></li>
                        <li><a href="#" className="">Product Returns</a></li>
                        <li><a href="#" className="">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4 ">Naturo Social Media</h3>
                    <p className="text-[#117E3A] font-medium">Follow us on social media to stay updated with our latest offers.</p>
                    <div className="flex items-center gap-4 mt-6">
                        <img className=" rounded-full" src={fb} alt="" />
                        <img className=" rounded-full" src={whats} alt="" />

                    </div>
                </div>
            </div>

            {/* --- Social Media --- */}
            <div className="border-t border-gray-700 mt-6 pt-6 pb-5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#117E3A] text-center md:text-left">
                        © 2025 <span className=" font-semibold">Naturo</span>. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;