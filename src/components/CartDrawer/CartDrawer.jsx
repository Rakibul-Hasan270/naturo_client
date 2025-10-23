import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import useAllItem from "../../hooks/useAllItem";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Notiflix from "notiflix";

const CartDrawer = ({ onClose }) => {
    const [products] = useAllItem();
    const [cartItems, setCartItems] = useState([]);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("products")) || [];
        const matchedItems = products.filter((p) => storedCart.includes(p._id));
        setCartItems(matchedItems);
    }, [products]);

    const handelDeleteProduct = (id) => {
        Notiflix.Confirm.show(
            "Are you sure?",
            "You won’t be able to revert this!",
            "Yes, Delete it",
            "Cancel",
            async () => {
                try {
                    const storedCart = JSON.parse(localStorage.getItem("products")) || [];
                    const updatedCart = storedCart.filter((pid) => pid !== id);
                    localStorage.setItem("products", JSON.stringify(updatedCart));
                    setCartItems((prev) => prev.filter((item) => item._id !== id));
                    Notiflix.Notify.success("Product removed from cart", { timeout: 1000 });
                } catch (error) {
                    console.error(error);
                    Notiflix.Report.failure(
                        "Error",
                        "Failed to delete product. Please try again.",
                        "OK"
                    );
                }
            },
            {
                width: "320px",
                okButtonBackground: "#3085d6",
                titleColor: "#e84118",
            }
        );
    };

    const handleCloseDrawer = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <div
            className="fixed inset-0 bg-black/30 flex justify-end z-50"
            onClick={handleCloseDrawer}
        >
            <div
                className={`bg-white dark:bg-gray-800 w-[600px] h-full p-5 shadow-lg transform transition-transform duration-300 ${isClosing ? "translate-x-full" : "translate-x-0"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="md:flex items-center justify-between w-full">
                        <h2
                            onClick={handleCloseDrawer}
                            className="text-[13px] flex items-center gap-2 cursor-pointer"
                        >
                            <IoArrowBack /> Continue Shopping
                        </h2>
                        <h2 className="text-2xl font-bold">Your Cart</h2>
                        <h2 className="border px-2 py-1 rounded-full">{cartItems.length}</h2>
                    </div>
                </div>

                {/* cart product list */}
                <div className="mt-4">
                    {cartItems.length === 0 ? (
                        <>
                            <p className="text-xl text-center font-semibold">Your cart is empty</p>
                            <p className="text-center font-semibold">
                                Add items to your cart to see them here.
                            </p>
                        </>
                    ) : (
                        <ul className="space-y-3">
                            {cartItems.map((item) => (
                                <li
                                    key={item._id}
                                    className="shadow-2xl p-3 rounded-md flex items-center justify-between gap-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div className="md:w-[300px]">
                                            <h2>{item.name}</h2>
                                            <div className="flex gap-3 mt-3.5">
                                                <p className="border border-gray-600 flex items-center justify-center w-12 py-2 cursor-pointer">-</p>
                                                <p className="border border-gray-600 flex items-center justify-center w-12 py-2 cursor-pointer">1</p>
                                                <p className="border border-gray-600 flex items-center justify-center w-12 py-2 cursor-pointer">+</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            onClick={() => handelDeleteProduct(item._id)}
                                            className="text-xl mb-4 flex justify-end cursor-pointer"
                                        >
                                            <RiDeleteBin5Line />
                                        </div>
                                        <div>
                                            <h3 className="flex items-center">
                                                <FaBangladeshiTakaSign className="text-xs" />
                                                {item.presentPrice}
                                            </h3>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
