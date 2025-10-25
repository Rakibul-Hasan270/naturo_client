import { FaShoppingCart } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Card = ({ item }) => {
    const { name, presentPrice, pastPrice, image, _id } = item;
    const [products, setProducts] = useState([]);
    const [colorBtn, setColorBtn] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("products");
        if (stored) {
            setProducts(JSON.parse(stored));
        }
    }, []);

    const color = products.map(products => console.log(products));



    return (
        <Link to={`/product-details/${_id}`} className="w-full overflow-hidden rounded-lg">
            <img
                className="w-full h-56 object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110"
                src={image}
                alt={name}
            />

            <div className="flex">
                <div className="flex-1 p-2 flex justify-center items-center bg-[#F2F2F2] border-r cursor-pointer">
                    <GrFormView />
                </div>
                <div className="flex-1 p-2 flex justify-center items-center bg-[#F2F2F2] cursor-pointer">
                    <FaShoppingCart />
                </div>
            </div>

            <div className="px-3 py-4">
                <h1 className="h-6 truncate font-bold">
                    {name}
                </h1>

                <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center font-semibold text-xl text-[#669900]">
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

export default Card;