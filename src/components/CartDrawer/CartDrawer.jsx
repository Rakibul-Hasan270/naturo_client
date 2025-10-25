import { IoArrowBack } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import useAllItem from "../../hooks/useAllItem";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Notiflix from "notiflix";
import CommonCartSection from "../CommonCartSection/CommonCartSection";
import { CartContext } from "../../provider/CartProvider/CartProvider";

const CartDrawer = ({ onClose }) => {
    const [products, isLoading] = useAllItem();
    const [cartItems, setCartItems] = useState([]);
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(true);
    const [quantities, setQuantities] = useState(1);
    const { refreshCart } = useContext(CartContext);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("products")) || [];
        const matchedItems = products.filter((p) => storedCart.includes(p._id));
        setCartItems(matchedItems);
        setTimeout(() => setIsOpening(false), 20);
    }, [products]);

    useEffect(() => {
        const initialQuantities = {};
        cartItems.forEach((item) => {
            initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);
    }, [cartItems]);


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
        if (!isClosing) {
            setIsClosing(true);
            onClose();
            setIsClosing(false);
        }
    };

    const handleAddition = (product) => {
        setQuantities((prev) => {
            const current = prev[product._id] || 1;
            if (current >= 5) return prev; // limit = 5
            return { ...prev, [product._id]: current + 1 };
        });
    };

    const handleSubtraction = (product) => {
        setQuantities((prev) => {
            const current = prev[product._id] || 1;
            const newQuantity = current - 1;
            if (newQuantity === 0) {
                try {
                    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
                    const updatedProducts = storedProducts.filter(
                        (id) => id !== product._id
                    );
                    localStorage.setItem("products", JSON.stringify(updatedProducts));
                    setCartItems((prevItems) =>
                        prevItems.filter((item) => item._id !== product._id)
                    );
                    refreshCart();
                } catch (error) {
                    console.error("Error updating localStorage:", error);
                }
            }

            if (newQuantity < 0) return prev;
            return { ...prev, [product._id]: newQuantity };
        });
    };

    const getTotalPrice = (product) => {
        const qty = quantities[product._id] || 1;
        return product.presentPrice * qty;
    };

    const totalPrice = cartItems.reduce((total, item) => {
        const quantity = quantities[item._id] || 1;
        return total + item.presentPrice * quantity;
    }, 0);


    return (
        <div className="fixed inset-0 flex text-black justify-end z-50" onClick={handleCloseDrawer}>
            <div className={`bg-white w-full md:w-[560px] h-full p-5 mb-10 shadow-lg transform transition-transform duration-300 ${isClosing
                ? "translate-x-full"
                : isOpening
                    ? "translate-x-full"
                    : "translate-x-0"
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
                            <IoArrowBack /> <span className="font-semibold">Continue Shopping</span>
                        </h2>
                        <div className="flex justify-between md:block mt-1.5 md:mr-24">
                            <h2 className="text-xl md:text-2xl font-bold">Your Cart</h2>
                            <h2 className="md:hidden px-2 py-1 rounded-full flex items-center"><FaBangladeshiTakaSign className="text-xs"></FaBangladeshiTakaSign><span className="font-bold">{totalPrice}</span></h2>
                        </div>
                        <h2 className="border-2 font-bold hidden md:block px-2 py-1 rounded-full">{cartItems.length}</h2>
                    </div>
                </div>

                {/* cart product list */}
                <div className="mt-4 overflow-y-auto h-[80vh]">
                    {cartItems.length === 0 ? (
                        <>
                            <p className="text-xl text-center font-semibold">Your cart is empty</p>
                            <p className="text-center font-semibold">
                                Add items to your cart to see them here.
                            </p>
                        </>
                    ) : (
                        <div className="space-y-3">
                            {cartItems.map((product) => (
                                <li
                                    key={product._id}
                                    className="p-3 shadow rounded-md flex items-center justify-between gap-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-18 h-18 object-cover rounded-md"
                                        />
                                        <div className="flex md:flex-col text-[18px] font-semibold justify-between md:w-[300px]">
                                            <div className="">
                                                <h2>{product.name}</h2>
                                                <h2 className="font-medium text-xs flex md:hidden items-center gap-1"><FaBangladeshiTakaSign></FaBangladeshiTakaSign>{product.presentPrice}</h2>
                                            </div>

                                            {/* ------------------  */}
                                            <div className="flex gap-3 mt-3.5">
                                                <p onClick={() => handleSubtraction(product)} className="border border-[#E5E7EB] text-[#8B8B8B] flex items-center justify-center w-8 h-8 cursor-pointer">
                                                    -
                                                </p>
                                                <p className="border border-[#E5E7EB] text-[#8B8B8B] flex items-center justify-center w-8 h-8 cursor-pointer text-xs">
                                                    {quantities[product._id] || 1}
                                                </p>
                                                <p onClick={() => handleAddition(product)} className={`border border-[#E5E7EB] text-[#8B8B8B] flex items-center justify-center w-8 h-8 cursor-pointer select-none ${(quantities[product._id] || 1) >= 5 ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}>
                                                    +
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            onClick={() => handelDeleteProduct(product._id)}
                                            className="text-xl mb-4 md:flex justify-end cursor-pointer hidden"
                                        >
                                            <RiDeleteBin5Line />
                                        </div>
                                        <div className="hidden md:block">
                                            <h3 className="flex items-center">
                                                <FaBangladeshiTakaSign className="text-xs" />
                                                <span className="text-[#1B1B1B]">{getTotalPrice(product)}</span>
                                            </h3>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            <div className="mt-12 hidden md:block">
                                <h2 className="text-3xl font-bold">You'll also love</h2>
                                <div>
                                    <CommonCartSection products={products} isLoading={isLoading} isInsideDrawer={true}></CommonCartSection>
                                </div>
                            </div>
                            {/* ------------------------ */}
                        </div>
                    )}
                </div>
                {cartItems.length > 0 && <div className="mt-5">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">Total</h2>
                        <h2 className="text-xl font-semibold flex items-center">
                            <FaBangladeshiTakaSign className="text-sm mr-1" />
                            {cartItems.reduce((sum, product) => sum + getTotalPrice(product), 0)}
                        </h2>
                    </div>
                    <button className="btn w-full bg-[#A0CA4F] border-0">Order Now</button>
                </div>}
            </div>
        </div >
    );
};

export default CartDrawer;