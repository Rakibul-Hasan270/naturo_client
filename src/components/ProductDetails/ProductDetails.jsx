import { FaBagShopping, FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CartDrawer from "../CartDrawer/CartDrawer";
import { CartContext } from "../../provider/CartProvider/CartProvider";
import { motion, AnimatePresence } from "motion/react"
import { useForm } from "react-hook-form";
import { useLoadingBar } from "../../provider/LoadingBarProvider/LoadingBarProvider";
import useAllItem from "../../hooks/useAllItem";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ProductDetails = () => {
    const [products, isLoading] = useAllItem();
    const product = useLoaderData();
    const { complete } = useLoadingBar();
    const { name, pastPrice, image, category, _id } = product;
    const { drawerOpen, setDrawerOpen, refreshCart } = useContext(CartContext);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [quantities, setQuantities] = useState(1);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [productList, setProductList] = useState([]);
    const [selected, setSelected] = useState(0);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    useEffect(() => {
        complete();
    }, [complete])

    const onSubmit = async (data) => {
        setLoading(true);
        const orderInfo = {
            name: data.name,
            mobile: data.mobile,
            address: data.address,
            note: data.note,
            deliveryCharge: data.delivery,
            delivey: 'Subarea Dhaka',
            status: 'pending',
            orderAmount: getGrandTotal() + (selected || 0),
            date: new Date()
        }
        try {
            const result = await axiosPublic.post('/order', orderInfo);
            if (result.data.insertedId) {
                toast.success(`Your order is pending Mr.${data.name}`)
                navigate('/order-success');
            }
        } catch (err) {
            toast.error(err?.message);
            console.log(err?.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(selected);

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
            refreshCart();
        }
        setDrawerOpen(true);
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
                    setProductList((prevItems) =>
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

    const getGrandTotal = () => {
        return productList.reduce((total, product) => {
            const qty = quantities[product._id] || 1;
            return total + product.presentPrice * qty;
        }, 0);
    };

    const handelOrderNow = (id) => {
        setOrderModalOpen(true);
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const updatedProducts = storedProducts.includes(id) ? storedProducts : [...storedProducts, id];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        const matchedProduct = products.filter(p => updatedProducts.includes(p._id));
        setProductList(matchedProduct);
        refreshCart();
    };

    if (isLoading) return <Loading></Loading>;
    return (
        <div className="max-w-7xl bg-[#FFFFFF] mx-auto relative">
            <div className="md:flex items-center gap-12">
                <figure>
                    <img className="md:max-w-[600px] h-auto rounded-2xl" src={image} alt={name} />
                </figure>
                <div className="card-body relative">
                    <h2 className="text-2xl font-bold">{name}</h2>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center font-semibold text-xl text-[#666666] line-through">
                            <FaBangladeshiTakaSign /> {pastPrice}
                        </span>
                        <span className="flex items-center font-semibold text-2xl text-[#FA582C]">
                            <FaBangladeshiTakaSign /> {getTotalPrice(product)}
                        </span>
                    </div>

                    <div className="flex gap-6 mt-3.5">
                        <p onClick={() => handleSubtraction(product)} className="border border-[#E5E7EB] text-[#8B8B8B] flex items-center justify-center max-w-10 py-2 cursor-pointer">-</p>
                        <p className="border border-[#E5E7EB] text-[#8B8B8B] flex items-center justify-center max-w-10 py-2 cursor-pointer"> {quantities[product._id] || 1}</p>
                        <p onClick={() => handleAddition(product)} className="border border-[#E5E7EB] text-[#8B8B8B] flex items-center justify-center max-w-10 py-2 cursor-pointer">+</p>
                    </div>

                    <div className="flex mt-3.5 gap-[6%]">
                        <button
                            onClick={() => handleAddToCart(_id)}
                            className="btn border-2 btn-outline w-[47%]"
                        >
                            Add To Cart
                        </button>
                        <button
                            onClick={() => handelOrderNow(_id)}
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

            {/* dropdown for order  */}
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
                                    {/* ------------------------------------------------------------- */}

                                    <div className="mt-4 overflow-y-auto">
                                        {productList.length === 0 ? (
                                            setOrderModalOpen(false)
                                        ) : (
                                            <div className="space-y-3 text-gray-600">
                                                {productList.map((product) => (
                                                    <li
                                                        key={product._id}
                                                        className="p-3 shadow rounded-md flex items-center justify-between gap-3"
                                                    >
                                                        <div className="flex justify-between items-center w-full">
                                                            <div className="flex items-center gap-2.5">
                                                                <img
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    className="w-18 h-18 object-cover rounded-md"
                                                                />
                                                                <div>
                                                                    <h2 className="text-[18px] font-semibold">{product.name}</h2>

                                                                    <h2 className="font-semibold flex items-center gap-1">
                                                                        <FaBangladeshiTakaSign />
                                                                        {quantities[product._id] > 1 ? (
                                                                            <>
                                                                                {product.presentPrice} × {quantities[product._id]} ={" "}
                                                                                <span>
                                                                                    {product.presentPrice * quantities[product._id]}
                                                                                </span>
                                                                            </>
                                                                        ) : (
                                                                            <span>
                                                                                {product.presentPrice * (quantities[product._id] || 1)}
                                                                            </span>
                                                                        )}
                                                                    </h2>

                                                                </div>
                                                            </div>

                                                            <div className="flex gap-3">
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
                                                    </li>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* grnd total + delevery charge */}
                                    <div className="bg-gray-100 p-5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[19px] font-semibold">মোট: </p>
                                            <p className="text-[18px] font-bold">{getGrandTotal()} TK</p>
                                        </div>
                                        <div className="flex items-center justify-between border-gray-300 border-b pb-2">
                                            <p className="text-[19px] font-semibold">ডেলিভারি চার্জ: </p>
                                            <p className="text-[18px] font-bold">{selected} TK</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xl font-semibold">সর্বমোট</p>
                                            <p className="text-[18px] font-bold"> {getGrandTotal() + (selected || 0)} TK</p>
                                        </div>
                                    </div>

                                    {/* -------------------------------------------------------- */}

                                    {/* Example form fields */}
                                    <div className="mt-4 space-y-3">
                                        <h2 className="text-2xl font-bold text-center">অর্ডার করতে নিচের তথ্যগুলো দিন</h2>

                                        <div>
                                            <form
                                                onSubmit={handleSubmit(onSubmit)}
                                                className="w-full bg-white shadow-md rounded-xl p-6 space-y-5"
                                            >
                                                {/* নাম */}
                                                <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
                                                    <label className="md:w-40 w-full font-medium text-gray-700">
                                                        নাম:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("name", { required: "নাম লিখুন" })}
                                                        placeholder="আপনার নাম লিখুন"
                                                        className={`flex-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300"
                                                            }`}
                                                    />
                                                </div>
                                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                                                {/* মোবাইল নম্বর */}
                                                <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
                                                    <label className="md:w-40 w-full font-medium text-gray-700">
                                                        মোবাইল নম্বর:
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        {...register("mobile", {
                                                            required: "মোবাইল নম্বর লিখুন",
                                                            pattern: {
                                                                value: /^01[0-9]{9}$/,
                                                                message: "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন",
                                                            },
                                                        })}
                                                        placeholder="১১ সংখ্যার মোবাইল নম্বর লিখুন"
                                                        className={`flex-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.mobile ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-green-500"
                                                            }`}
                                                    />
                                                </div>
                                                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

                                                {/* ঠিকানা */}
                                                <div className="flex flex-col md:flex-row md:items-start gap-3 w-full">
                                                    <label className="md:w-40 w-full font-medium text-gray-700 mt-2">
                                                        ঠিকানা:
                                                    </label>
                                                    <textarea
                                                        {...register("address", { required: "ঠিকানা লিখুন", minLength: 10, maxLength: 80 })}
                                                        placeholder="আপনার ডেলিভারি ঠিকানা লিখুন"
                                                        rows="2"
                                                        className={`flex-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 resize-none ${errors.address ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-green-500"
                                                            }`}
                                                    />
                                                </div>
                                                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                                                {errors.address?.type === "minLength" && <p className="text-red-500 text-sm">To Short</p>}
                                                {errors.address?.type === "maxLength" && <p className="text-red-500 text-sm">To High</p>}

                                                {/* অর্ডার নোট */}
                                                <div className="flex flex-col md:flex-row md:items-start gap-3 w-full">
                                                    <label className="md:w-40 w-full font-medium text-gray-700 mt-2">
                                                        অর্ডার নোট:
                                                    </label>
                                                    <textarea
                                                        {...register("note")}
                                                        placeholder="অতিরিক্ত কোনো নির্দেশনা থাকলে লিখুন"
                                                        rows="2"
                                                        className="flex-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                                    />
                                                </div>

                                                {/* ডেলিভারি অপশন */}
                                                <div className="w-full">
                                                    <label className="block font-medium text-gray-700 mb-2">
                                                        ডেলিভারি এলাকা নির্বাচন করুন:
                                                    </label>

                                                    <div className="flex flex-col gap-3">
                                                        {/* Option 1 */}
                                                        <label
                                                            className={`flex justify-between items-center border rounded-lg px-4 py-2 cursor-pointer transition ${selected === 50
                                                                ? "border-green-500 bg-green-50"
                                                                : "border-gray-300 bg-white"
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="radio"
                                                                    value={50}
                                                                    {...register("delivery", { required: "ডেলিভারি এলাকা নির্বাচন করুন" })}
                                                                    onChange={(e) => setSelected(Number(e.target.value))} // number হিসেবে রাখছি
                                                                    className="accent-green-600 w-4 h-4"
                                                                />
                                                                <span className="font-medium text-gray-800">
                                                                    ঢাকা সিটির ভিতরে
                                                                </span>
                                                            </div>
                                                            <span className="text-gray-700 font-semibold">৫০ টাকা</span>
                                                        </label>

                                                        {/* Option 2 */}
                                                        <label
                                                            className={`flex justify-between items-center border rounded-lg px-4 py-2 cursor-pointer transition ${selected === 80
                                                                ? "border-green-500 bg-green-50"
                                                                : "border-gray-300 bg-white"
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="radio"
                                                                    value={80}
                                                                    {...register("delivery", { required: "ডেলিভারি এলাকা নির্বাচন করুন" })}
                                                                    onChange={(e) => setSelected(Number(e.target.value))}
                                                                    className="accent-green-600 w-4 h-4"
                                                                />
                                                                <span className="font-medium text-gray-800">
                                                                    ঢাকা সিটির বাইরে
                                                                </span>
                                                            </div>
                                                            <span className="text-gray-700 font-semibold">৮০ টাকা</span>
                                                        </label>

                                                        {/* Option 3 */}
                                                        <label
                                                            className={`flex justify-between items-center border rounded-lg px-4 py-2 cursor-pointer transition ${selected === 100
                                                                ? "border-green-500 bg-green-50"
                                                                : "border-gray-300 bg-white"
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="radio"
                                                                    value={100}
                                                                    {...register("delivery", { required: "ডেলিভারি এলাকা নির্বাচন করুন" })}
                                                                    onChange={(e) => setSelected(Number(e.target.value))}
                                                                    className="accent-green-600 w-4 h-4"
                                                                />
                                                                <span className="font-medium text-gray-800">
                                                                    ঢাকা জেলার বাইরে
                                                                </span>
                                                            </div>
                                                            <span className="text-gray-700 font-semibold">১০০ টাকা</span>
                                                        </label>
                                                    </div>

                                                    {errors.delivery && (
                                                        <p className="text-red-500 text-sm mt-2">
                                                            {errors.delivery.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="cursor-pointer mt-6 w-full bg-[#FA582D] text-white py-3 rounded-xl font-semibold hover:bg-[#e14c22] transition"
                                                >
                                                    {
                                                        loading ? 'অর্ডার কনফার্ম করা হচ্ছে' : `অর্ডার নিশ্চিত করুন  ${getGrandTotal() + (selected || 0)} TK`
                                                    }
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center mt-4 font-semibold text-gray-500 text-xs">আমাদের একজন কাস্টমার প্রতিনিধি আপনাকে কল করে আবার নিশ্চিত করবেন।</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetails;