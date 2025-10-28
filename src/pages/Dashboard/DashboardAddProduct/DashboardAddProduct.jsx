import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const DashboardAddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        setLoading(true);
        const imageFile = { image: data.image[0] };
        const resImg = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (resImg.data.success) {
            const productInfo = {
                name: data.name,
                category: data.category,
                image: resImg.data.data.display_url,
                presentPrice: parseFloat(data.presentPrice),
                pastPrice: parseFloat(data.pastPrice),
                best_sell: true
            }
            const resPostData = await axiosPublic.post('/items', productInfo);
            if (resPostData.data.insertedId) {
                toast.success(`${data.name} added to Products`);
                setLoading(false);
            }
        }
    }

    return (
        <div className="text-gray-600">
            <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mt-14">Add Product</h2>
            <div className="p-3 md:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">

                    {/* name field */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            name="name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 
        border-b-2 appearance-none focus:outline-none focus:ring-0 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm 
        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Product Name
                        </label>
                        {errors.name && <span className="text-xs text-red-600">Product Name is required</span>}
                    </div>

                    {/* category field */}
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Category</label>
                        <select
                            {...register("category", { required: true })}
                            className="w-full border p-2 rounded bg-transparent"
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
                        {errors.category && <span className="text-xs text-red-600">Category is required</span>}
                    </div>

                    {/* image field */}
                    <div className="mb-8">
                        <label htmlFor="file_input" className="block mb-2 text-sm">
                            Upload Image
                        </label>
                        <input
                            {...register('image', { required: true })}
                            type="file"
                            className="file-input w-full border rounded bg-transparent"
                        />
                        {errors.image && <span className="text-xs text-red-600">Image is required</span>}
                    </div>

                    {/* price fields */}
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                {...register('presentPrice', { required: true })}
                                type="number"
                                name="presentPrice"
                                id="presentPrice"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 
          border-b-2 appearance-none focus:outline-none focus:ring-0 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="presentPrice"
                                className="peer-focus:font-medium absolute text-sm 
          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Present Price
                            </label>
                            {errors.presentPrice && <span className="text-xs text-red-600">Present price is required</span>}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                {...register('pastPrice', { required: true })}
                                type="number"
                                name="pastPrice"
                                id="pastPrice"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 
          border-b-2 appearance-none focus:outline-none focus:ring-0 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="pastPrice"
                                className="peer-focus:font-medium absolute text-sm 
          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Past Price
                            </label>
                            {errors.pastPrice && <span className="text-xs text-red-600">Past price is required</span>}
                        </div>
                    </div>

                    {/* submit button */}
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
                                Submitting...
                            </div>
                        ) : 'Submit'}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default DashboardAddProduct;