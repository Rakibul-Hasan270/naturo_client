import { FaBagShopping, FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CartDrawer from "../CartDrawer/CartDrawer";
import { CartContext } from "../../provider/CartProvider/CartProvider";
import { useLoadingBar } from "../../provider/LoadingBarProvider/LoadingBarProvider";
import useAllItem from "../../hooks/useAllItem";
import Loading from "../Loading/Loading";
import Checkout from "../Checkout/Checkout";

const ProductDetails = () => {
    const product = useLoaderData();
    const { name, pastPrice, image, category, _id } = product;
    const { complete } = useLoadingBar();
    const { drawerOpen, setDrawerOpen, refreshCart } = useContext(CartContext);

    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [quantities, setQuantities] = useState(1);
    const [productList, setProductList] = useState([]);
    const [products, isLoading] = useAllItem();



    useEffect(() => {
        complete();
    }, [complete])


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
            <Checkout productList={productList} quantities={quantities} orderModalOpen={orderModalOpen} setOrderModalOpen={setOrderModalOpen} handleAddition={handleAddition} handleSubtraction={handleSubtraction} />
        </div>
    );
};

export default ProductDetails;