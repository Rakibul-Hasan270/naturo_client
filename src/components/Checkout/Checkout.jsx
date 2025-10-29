import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react"
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Checkout = ({ productList, quantities, orderModalOpen, setOrderModalOpen, handleAddition, handleSubtraction }) => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(0);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const getGrandTotal = () => {
        return productList.reduce((total, product) => {
            const qty = quantities[product._id] || 1;
            return total + product.presentPrice * qty;
        }, 0);
    };

    useEffect(() => {
        if (productList.length === 0 && orderModalOpen) {
            setOrderModalOpen(false);
        }
    }, [productList, orderModalOpen, setOrderModalOpen]);

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
    return (
        <div>
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

export default Checkout;