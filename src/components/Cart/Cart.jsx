import { FaShoppingCart } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProfileCard = ({ item }) => {
    const { name, presentPrice, pastPrice, image, _id } = item;

    return (
        <Link to={`/product-details/${_id}`} className="w-full overflow-hidden bg-white rounded-lg border-b dark:bg-gray-800 shadow-2xl">
            <img
                className="w-full h-56 object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110"
                src={image}
                alt={name}
            />

            <div className="flex text-white">
                <div className="flex-1 p-2 flex justify-center items-center bg-gray-500 border-r cursor-pointer">
                    <GrFormView />
                </div>
                <div className="flex-1 p-2 flex justify-center items-center bg-gray-500 cursor-pointer">
                    <FaShoppingCart />
                </div>
            </div>

            <div className="px-3 py-4">
                <h1 className="text-gray-800 dark:text-white h-6 truncate">
                    {name}
                </h1>

                <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center font-semibold text-cyan-400">
                        <FaBangladeshiTakaSign /> {presentPrice}
                    </span>
                    <span className="flex items-center font-semibold line-through">
                        <FaBangladeshiTakaSign /> {pastPrice}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProfileCard;