import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="bg-cyan-900 text-white">
            <div className="max-w-6xl mx-auto p-3 flex items-center justify-between gap-4 relative">
                {/* Logo Section */}
                <div className="flex items-center gap-2.5">
                    <img
                        className="w-10 h-10 rounded-full"
                        src="/natero_logo.png"
                        alt="Naturo logo"
                    />
                    <div className="hidden sm:block leading-4">
                        <p className="uppercase text-2xl font-bold relative">
                            Naturo
                            <sup className="text-[10px] absolute top-2">TM</sup>
                        </p>
                        <p className="text-[10px] tracking-[3px] font-semibold whitespace-nowrap">
                            BACK TO NATURE
                        </p>
                    </div>
                </div>

                {/* Search Section */}
                <div className="flex-1 max-w-lg">
                    {/* md: full searchbar visible */}
                    <div className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-md">
                        <IoIosSearch className="text-gray-400 text-lg" />
                        <input
                            type="search"
                            placeholder="Search in Naturo..."
                            className="w-full bg-transparent text-sm placeholder-gray-400 outline-none font-semibold"
                        />
                    </div>

                    {/* mobile: only icon on right */}
                    <div className="flex md:hidden justify-end">
                        {showSearch ? (
                            <RxCross2
                                className="text-2xl text-gray-200 cursor-pointer transition-transform duration-200 hover:rotate-90"
                                onClick={() => setShowSearch(false)}
                            />
                        ) : (
                            <IoIosSearch
                                className="text-2xl text-gray-200 cursor-pointer"
                                onClick={() => setShowSearch(true)}
                            />
                        )}
                    </div>

                    {/* mobile search input (toggle) */}
                    {showSearch && (
                        <div className="absolute top-full left-0 w-full bg-gray-900 mt-2 rounded-md flex items-center gap-2 px-3 py-2 animate-fadeIn">
                            <IoIosSearch className="text-gray-400 text-lg" />
                            <input
                                type="search"
                                placeholder="Search in Naturo..."
                                className="w-full bg-transparent text-sm placeholder-gray-400 outline-none font-semibold"
                                autoFocus
                            />
                        </div>
                    )}
                </div>

                {/* Cart Section */}
                <div className="flex items-center gap-1 text-sm">
                    <div className="relative">
                        <MdOutlineShoppingCart className="text-2xl" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                            0
                        </span>
                    </div>
                    <p className="hidden sm:block">Cart</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;