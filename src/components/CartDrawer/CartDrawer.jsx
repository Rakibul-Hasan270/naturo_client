import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import useAllItem from "../../hooks/useAllItem";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Notiflix from "notiflix";

const CartDrawer = ({ onClose }) => {
    const [products] = useAllItem();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("products")) || [];
        const matchedItems = products.filter((p) => storedCart.includes(p._id));
        setCartItems(matchedItems);
    }, [products]);

    const handelDeleteProduct = id => {
        Notiflix.Confirm.show(
            'Are you sure?',
            'You won’t be able to revert this!',
            'Yes, Delete it',
            'Cancel',
            async () => {
                try {
                    // get storedCart 
                    const storedCart = JSON.parse(localStorage.getItem("products")) || [];
                    // updated cart 
                    const updatedCart = storedCart.filter(pid => pid !== id);
                    // updated cart set 
                    localStorage.setItem("products", JSON.stringify(updatedCart));
                    // refetch ui 
                    setCartItems(prev => prev.filter(item => item._id !== id));
                    // confirmation 
                    Notiflix.Notify.success('Product removed from cart');
                } catch (error) {
                    console.error(error);
                    Notiflix.Report.failure(
                        'Error',
                        'Failed to delete user. Please try again.',
                        'OK'
                    );
                }
            },
            {
                width: '320px',
                okButtonBackground: '#3085d6',
                titleColor: '#e84118',
            }
        );
    }

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
            <div className="bg-white dark:bg-gray-800 w-[600px] h-full p-5 shadow-lg animate-slideLeft">

                {/* header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="md:flex items-center justify-between w-full">
                        <h2
                            onClick={onClose}
                            className="text-[13px] flex items-center gap-2 cursor-pointer"
                        >
                            <IoArrowBack /> Continue Shopping
                        </h2>
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <h2 className="border px-2 py-1 rounded-full">{cartItems.length}</h2>
                    </div>
                </div>

                {/* cart product list */}
                <div className="mt-4">
                    {cartItems.length === 0 ? (<p className="text-gray-500">🛒 Empty Cart</p>) : (
                        <ul className="space-y-3">
                            {
                                cartItems.map((item) => (
                                    <li key={item._id} className="shadow-2xl p-3 rounded-md flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">

                                            {/* image fild  */}
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />

                                            {/* quantity fiels */}
                                            <div className="md:w-[300px]">
                                                <div>
                                                    <h2>{item.name}</h2>
                                                </div>
                                                <div className="flex gap-3 mt-3.5">
                                                    <p className="border border-gray-600 flex items-center justify-center w-12 py-2 cursor-pointer">-</p>
                                                    <p className="border border-gray-600 flex items-center justify-center w-12 py-2 cursor-pointer">1</p>
                                                    <p className="border border-gray-600 flex items-center justify-center w-12 py-2 cursor-pointer">+</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div onClick={() => handelDeleteProduct(item._id)} className="text-xl mb-4 flex justify-end"><RiDeleteBin5Line></RiDeleteBin5Line></div>
                                            <div><h3 className="flex items-center"><FaBangladeshiTakaSign className="text-xs"></FaBangladeshiTakaSign>{item.presentPrice}</h3></div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
