import { useContext, useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import { CartContext } from "../../provider/CartProvider/CartProvider";
import toast from "react-hot-toast";
import logo from '../../assets/Logo/logo.png';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLoadingBar } from "../../provider/LoadingBarProvider/LoadingBarProvider";

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const { cartItems, drawerOpen, setDrawerOpen } = useContext(CartContext);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const desktopSearchRef = useRef(null);
    const navigate = useNavigate();
    const { start } = useLoadingBar();

    const handelSearch = event => {
        event.preventDefault();
        const text = event.target.value;
        setSearch(text);
    }

    useEffect(() => {
        if (search.trim() === "") return;
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:9000/items?search=${encodeURIComponent(search)}`);
                const data = await res.json();
                setSearchData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error(error?.message);
            }
        };
        fetchData();
    }, [search])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)) {
                setShowSearch(false);
                setSearchData([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handelNavigate = () => {
        start();
        navigate('/');
    }


    return (
        <nav className="bg-[#003315] text-white sticky top-0 z-50 shadow-md transition-all duration-300">
            <div
                className={`max-w-[1500px] mx-auto px-4 flex items-center justify-between gap-4 transition-all duration-300 ${showSearch ? "py-4 flex-col md:flex-row" : "py-4"
                    }`}
            >
                {/* ---------- Left: Logo ---------- */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <button onClick={handelNavigate} className="flex items-center">
                        <img
                            src={logo}
                            alt="Naturo logo"
                            className="h-14 w-auto object-contain"
                        />
                    </button>

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
                                onClick={() => {
                                    setShowSearch(false);
                                    setSearchData([]);
                                    setSearch('');
                                }}
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
                        onChange={handelSearch}
                        name="search"
                        type="search"
                        placeholder="Search in Naturo..."
                        className="w-full bg-transparent text-sm placeholder-[#25B672] outline-none font-semibold text-[#CAE9D7]"
                    />

                    {/* Search Results Dropdown */}
                    {searchData.length > 0 && (
                        <div ref={desktopSearchRef} className="absolute left-1/2 top-[60px] transform -translate-x-1/2 ml-[52px] md:w-[1100px] bg-white text-black shadow-lg md:max-h-[500px] overflow-y-auto z-50 px-5">
                            <p className="text-xs text-gray-600 mt-1.5">Found {searchData.length} results for "{search}"</p>
                            {searchData.map(item => (
                                <Link
                                    key={item._id}
                                    to={`/product-details/${item._id}`}
                                    className="border-b border-gray-300 px-3 py-2 hover:bg-gray-100 flex items-center gap-2.5"
                                >
                                    <img className="h-10 w-10" src={item.image} alt="" />
                                    <div>
                                        <h2>{item.name}</h2>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="flex items-center font-semibold">
                                                <FaBangladeshiTakaSign /> {item.presentPrice}
                                            </span>
                                            <span className="flex items-center  line-through">
                                                <FaBangladeshiTakaSign /> {item.pastPrice}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

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
                    <div className="w-full relative flex flex-col gap-2 px-3 py-3 animate-fadeIn">
                        {/* Search Input */}
                        <div className="flex items-center gap-2 relative bg-[#000F06] px-3 py-3">
                            <IoIosSearch className="text-[#25B672] text-lg" />
                            <input
                                type="search"
                                placeholder="Search in Naturo..."
                                className="w-full text-sm placeholder-[#25B672] outline-none font-semibold"
                                autoFocus
                                value={search}
                                onChange={handelSearch}
                            />
                        </div>

                        {/* Mobile Search Results Dropdown */}
                        {searchData.length > 0 && (
                            <div className="absolute top-[60px] rounded-md left-0 w-full bg-white text-gray-800 shadow-lg max-h-80 overflow-y-auto z-50 p-2">
                                <p className="text-xs text-gray-600 mt-1.5">
                                    Found {searchData.length} results for "{search}"
                                </p>
                                {searchData.map(item => (
                                    <Link
                                        key={item._id}
                                        to={`/product-details/${item._id}`}
                                        className="border-b border-gray-300 px-3 py-2 hover:bg-gray-100 flex items-center gap-2.5"
                                        onClick={() => setShowSearch(false)}
                                    >
                                        <img className="h-10 w-10" src={item.image} alt="" />
                                        <div>
                                            <h2>{item.name}</h2>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="flex items-center font-semibold">
                                                    <FaBangladeshiTakaSign /> {item.presentPrice}
                                                </span>
                                                <span className="flex items-center line-through">
                                                    <FaBangladeshiTakaSign /> {item.pastPrice}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ---------- Cart Drawer ---------- */}
            {drawerOpen && <CartDrawer onClose={() => setDrawerOpen(false)} />}
        </nav>
    );
};

export default Navbar;