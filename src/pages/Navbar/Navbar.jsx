import { useContext, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import { CartContext } from "../../provider/CartProvider/CartProvider";
import logo from "../../assets/Logo/logo.png";

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const { cartItems, drawerOpen, setDrawerOpen } = useContext(CartContext);

    return (
        <nav className="bg-[#003315] text-white sticky top-0 z-50 shadow-md transition-all duration-300">
            <div
                className={`max-w-[1500px] mx-auto px-4 flex items-center justify-between gap-4 transition-all duration-300 ${showSearch ? "py-4 flex-col md:flex-row" : "py-4"
                    }`}
            >
                {/* ---------- Left: Logo ---------- */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Naturo logo"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* ---------- Right: Icons (Mobile) ---------- */}
                    <div className="flex items-center gap-4 md:hidden">
                        {/* Cart */}
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MdOutlineShoppingCart className="text-2xl" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                                {cartItems.length}
                            </span>
                        </div>

                        {/* Search toggle */}
                        {showSearch ? (
                            <RxCross2
                                className="text-2xl cursor-pointer transition-transform duration-200 hover:rotate-90"
                                onClick={() => setShowSearch(false)}
                            />
                        ) : (
                            <IoIosSearch
                                className="text-2xl cursor-pointer"
                                onClick={() => setShowSearch(true)}
                            />
                        )}
                    </div>
                </div>

                {/* ---------- Search bar (Desktop) ---------- */}
                <div className="hidden md:flex items-center gap-2 bg-[#000F06] px-3 py-3 w-[1100px]">
                    <IoIosSearch className="text-[#25B672] text-lg" />
                    <input
                        type="search"
                        placeholder="Search in Naturo..."
                        className="w-full bg-transparent text-sm placeholder-[#25B672] outline-none font-semibold text-[#CAE9D7]"
                    />
                </div>

                {/* ---------- Right side (Desktop) ---------- */}
                <div
                    className="hidden md:flex items-center gap-1 text-sm cursor-pointer"
                    onClick={() => setDrawerOpen(true)}
                >
                    <div className="relative">
                        <MdOutlineShoppingCart className="text-2xl" />
                        <span className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-[10px] px-1.5 rounded-full">
                            {cartItems.length}
                        </span>
                    </div>
                    <p>Cart</p>
                </div>

                {/* ---------- Search Input (Mobile Expand) ---------- */}
                {showSearch && (
                    <div className="w-full bg-[#001D0C] flex items-center gap-2 px-3 py-3 animate-fadeIn">
                        <IoIosSearch className="text-[#25B672] text-lg" />
                        <input
                            type="search"
                            placeholder="Search in Naturo..."
                            className="w-full bg-transparent text-sm placeholder-[#25B672] outline-none font-semibold"
                            autoFocus
                        />
                    </div>
                )}
            </div>

            {/* ---------- Cart Drawer ---------- */}
            {drawerOpen && <CartDrawer onClose={() => setDrawerOpen(false)} />}
        </nav>
    );
};

export default Navbar;