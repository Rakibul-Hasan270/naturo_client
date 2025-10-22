import { FaBagShopping, FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
    const item = useLoaderData();
    const { name, presentPrice, pastPrice, image, category } = item;

    return (
        <div className="max-w-6xl mx-auto mt-6 md:mt-10 p-4">
            <div className="md:flex items-center gap-12">
                <figure>
                    <img className="md:max-w-[600px] rounded-2xl" src={image} alt={name} />
                </figure>
                <div className="card-body">
                    <h2 className="text-2xl font-bold">{name}</h2>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center font-semibold text-xl line-through">
                            <FaBangladeshiTakaSign /> {pastPrice}
                        </span>
                        <span className="flex items-center font-semibold text-2xl text-red-400">
                            <FaBangladeshiTakaSign /> {presentPrice}
                        </span>
                    </div>

                    {/* number rou  */}
                    <div className="flex gap-6 mt-3.5">
                        <p className="border border-gray-600 flex items-center justify-center max-w-14 py-2.5 cursor-pointer">-</p>
                        <p className="border border-gray-600 flex items-center justify-center max-w-14 py-2.5 cursor-pointer">1</p>
                        <p className="border border-gray-600 flex items-center justify-center max-w-14 py-2.5 cursor-pointer">+</p>
                    </div>

                    {/* btn rou  */}
                    <div className="flex mt-3.5 gap-[6%]">
                        <button className="btn btn-outline hover:bg-rose-500 w-[47%]">Add To Cart</button>
                        <button className="btn bg-red-500 hover:btn-outline w-[47%]"><FaBagShopping></FaBagShopping> Order Now</button>
                    </div>
                    <button className="btn btn-outline">Call Order: 688768766</button>
                    <p className="text-xl mt-5 font-bold">Category: {category}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;