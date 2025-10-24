import { FaBagShopping, FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CartDrawer from "../CartDrawer/CartDrawer";
import { CartContext } from "../../provider/CartProvider/CartProvider";
import { motion, AnimatePresence } from "motion/react"

const ProductDetails = () => {
    const product = useLoaderData();
    const { name, presentPrice, pastPrice, image, category, _id } = product;
    const { setCartItems, drawerOpen, setDrawerOpen } = useContext(CartContext);
    const [orderModalOpen, setOrderModalOpen] = useState(false);

    // save recently viewed product
    useEffect(() => {
        if (product?._id) {
            let viewedIds = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
            const alreadyExists = viewedIds.includes(product._id);
            if (!alreadyExists) {
                viewedIds.push(product._id);
                if (viewedIds.length > 6) viewedIds.shift();
            }
            localStorage.setItem("recentlyViewed", JSON.stringify(viewedIds));
        }
    }, [product]);

    const handleAddToCart = (id) => {
        const storedCart = JSON.parse(localStorage.getItem('products')) || [];
        if (!storedCart.includes(id)) {
            storedCart.push(id);
            localStorage.setItem('products', JSON.stringify(storedCart));
            setCartItems(prev => [...prev, id]);
        }
        setDrawerOpen(true);
    };

    return (
        <div className="max-w-7xl bg-[#FFFFFF] mx-auto mt-6 p-4 relative">
            <div className="md:flex items-center gap-12">
                <figure>
                    <img className="md:max-w-[600px] rounded-2xl" src={image} alt={name} />
                </figure>
                <div className="card-body relative z-50">
                    <h2 className="text-2xl font-bold">{name}</h2>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center font-semibold text-xl text-[#666666] line-through">
                            <FaBangladeshiTakaSign /> {pastPrice}
                        </span>
                        <span className="flex items-center font-semibold text-2xl text-[#FA582C]">
                            <FaBangladeshiTakaSign /> {presentPrice}
                        </span>
                    </div>

                    <div className="flex gap-6 mt-3.5">
                        <p className="border border-[#E5E7EB] text-[#8B8B8B] flex items-center justify-center max-w-10 py-2 cursor-pointer">-</p>
                        <p className="border border-[#E5E7EB] text-[#8B8B8B] flex items-center justify-center max-w-10 py-2 cursor-pointer">1</p>
                        <p className="border border-[#E5E7EB] text-[#8B8B8B] flex items-center justify-center max-w-10 py-2 cursor-pointer">+</p>
                    </div>

                    <div className="flex mt-3.5 gap-[6%]">
                        <button
                            onClick={() => handleAddToCart(_id)}
                            className="btn border-2 btn-outline w-[47%]"
                        >
                            Add To Cart
                        </button>
                        <button
                            onClick={() => setOrderModalOpen(true)}
                            className="btn border-0 bg-[#FA582D] text-[#FFFFFF] w-[47%] flex items-center gap-2"
                        >
                            <FaBagShopping /> Order Now
                        </button>
                    </div>

                    <button className="btn border-2 btn-outline mt-3">Call Order: 688768766</button>
                    <p className="text-xl mt-5 font-bold">Category: {category}</p>
                </div>
            </div>

            {/* Cart Drawer */}
            {drawerOpen && (
                <CartDrawer onClose={() => setDrawerOpen(false)} />
            )}

            <AnimatePresence>
                {orderModalOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 flex items-end justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOrderModalOpen(false)}
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="fixed inset-0 z-50 flex items-end justify-center"
                        >
                            <div
                                className="bg-white rounded-t-2xl p-6 w-full h-[80vh] sm:h-[700px] max-w-4xl mx-auto shadow-2xl overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4 pb-3 sticky top-0 bg-white">
                                    <h2 className="text-xl sm:text-2xl font-semibold">ক্যাশ অন ডেলিভারি অপশনে অর্ডার করুন</h2>
                                    <button
                                        className="text-gray-600 hover:text-gray-900 text-2xl"
                                        onClick={() => setOrderModalOpen(false)}
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="space-y-3 text-gray-700 mt-2">
                                    <div className="flex justify-between">
                                        <h3 className="text-2xl font-bold">সর্বমোট</h3>
                                        <h3 className="text-xl font-semibold">7755 TK</h3>
                                    </div>

                                    {/* Example form fields */}
                                    <div className="mt-4 space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full border rounded-lg p-3 focus:outline-[#FA582D]"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full border rounded-lg p-3 focus:outline-[#FA582D]"
                                        />
                                        <textarea
                                            placeholder="Delivery Address"
                                            rows="3"
                                            className="w-full border rounded-lg p-3 focus:outline-[#FA582D]"
                                        />
                                    </div>
                                </div>

                                {/* Confirm Button */}
                                <button
                                    onClick={() => alert("Order Confirmed!")}
                                    className="mt-6 w-full bg-[#FA582D] text-white py-3 rounded-xl font-semibold hover:bg-[#e14c22] transition"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>




        </div>
    );
};

export default ProductDetails;
