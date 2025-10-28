import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const DashboardEditProduct = () => {
    const product = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        let image = '';
        if (data.image && data.image[0]) {
            const formData = new FormData();
            formData.append('image', data.image[0]);
            try {
                const resImg = await axiosPublic.post(image_hosting_api, formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                });

                if (resImg.data.success) {
                    image = resImg.data.data.display_url;
                }
            } catch (err) {
                console.log("Image upload failed:", err?.message);
                toast.error(err?.message);
            }
        }
        const updateInfo = { ...data, image: image || 'https://i.ibb.co.com/7JXwFp6k/pexels-ahmedadly-1270184.jpg' };

        try {
            const resUpdate = await axiosPublic.patch(`/items/${product._id}`, updateInfo);
            if (resUpdate.data.modifiedCount > 0) {
                toast.success(' Update Successfully');
                reset();
            }
        } catch (err) {
            toast.error(err?.message);
            console.log(err.message);
        }
        finally {
            setLoading(false);
            navigate('/dashboard/products')
        }
    };

    return (
        <div className="w-full text-gray-600">
            <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mt-14">Edit Product</h2>
            <div className="md:p-20">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-semibold">Product Name</label>
                        <input
                            defaultValue={product.name}
                            {...register("name", { required: true })}
                            type="text"
                            placeholder="Free Health Camp for Rural Families"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-1 font-semibold">Category</label>
                        <select
                            defaultValue={product?.category}
                            {...register("category", { required: true })}
                            className="w-full border p-2 rounded bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">Select a category</option>
                            <option value="Herbs">Herbs</option>
                            <option value="Nuts">Nuts</option>
                            <option value="Super Food">Super Food</option>
                            <option value="Wellness">Wellness</option>
                            <option value="Combo">Combo</option>
                            <option value="Ghee">Ghee</option>
                            <option value="Honey">Honey</option>
                        </select>
                    </div>

                    {/* image fild  */}
                    <div>
                        <input
                            {...register('image', { required: true })}
                            type="file"
                            id="image"
                            className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg 
               file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full 
               dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 
               dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring 
               focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 
               dark:focus:border-blue-300"
                        />
                        {errors.image && <span className="text-xs text-red-600">Image is required</span>}
                    </div>

                    {/* present price */}
                    <div>
                        <label className="block mb-1 font-semibold">Present Price</label>
                        <input
                            defaultValue={product.presentPrice}
                            {...register("presentPrice", { required: true })}
                            type="number"
                            placeholder=""
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded font-semibold transition bg-[#A0CA4F] text-white"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                Updating...
                            </div>
                        ) : 'Update Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DashboardEditProduct;