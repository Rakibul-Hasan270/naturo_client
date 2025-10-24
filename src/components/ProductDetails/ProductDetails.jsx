import { FaBagShopping, FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import CartDrawer from "../CartDrawer/CartDrawer";
import { CartContext } from "../../provider/CartProvider/CartProvider";

const ProductDetails = () => {
    const product = useLoaderData();
    const { name, presentPrice, pastPrice, image, category, _id } = product;
    const { setCartItems, drawerOpen, setDrawerOpen } = useContext(CartContext);

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
            setCartItems(prev => [...prev, id]);
        }
        setDrawerOpen(true);
    };

    return (
        <div className="max-w-6xl mx-auto mt-6 md:mt-10 p-4">
            <div className="md:flex items-center gap-12">
                <figure>
                    <img className="md:max-w-[600px] rounded-2xl" src={image} alt={name} />
                </figure>
                <div className="card-body relative z-50">
                    <h2 className="text-2xl font-bold">{name}</h2>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center font-semibold text-xl line-through">
                            <FaBangladeshiTakaSign /> {pastPrice}
                        </span>
                        <span className="flex items-center font-semibold text-2xl text-red-400">
                            <FaBangladeshiTakaSign /> {presentPrice}
                        </span>
                    </div>

                    <div className="flex gap-6 mt-3.5">
                        <p className="border border-gray-600 flex items-center justify-center max-w-14 py-2.5 cursor-pointer">-</p>
                        <p className="border border-gray-600 flex items-center justify-center max-w-14 py-2.5 cursor-pointer">1</p>
                        <p className="border border-gray-600 flex items-center justify-center max-w-14 py-2.5 cursor-pointer">+</p>
                    </div>

                    <div className="flex mt-3.5 gap-[6%]">
                        <button
                            onClick={() => handleAddToCart(_id)}
                            className="btn btn-outline hover:bg-rose-500 w-[47%]"
                        >
                            Add To Cart
                        </button>
                        <button className="btn bg-red-500 hover:btn-outline w-[47%]">
                            <FaBagShopping /> Order Now
                        </button>
                    </div>

                    <button className="btn btn-outline mt-3">Call Order: 688768766</button>
                    <p className="text-xl mt-5 font-bold">Category: {category}</p>
                </div>
            </div>

            {drawerOpen && (
                <CartDrawer onClose={() => setDrawerOpen(false)} />
            )}

        </div>
    );
};

export default ProductDetails;