import useAllItem from "../../../hooks/useAllItem";
import Cart from "../../../components/Cart/Cart";
import Loading from "../../../components/Loading/Loading";

const AllProduct = () => {
    const [products, isLoading] = useAllItem();

    if (isLoading) return <Loading />;
    return (
        <div className="max-w-7xl mx-auto mt-8 md:mt-16">
            <h2 className="text-xl md:text-3xl font-bold text-center md:mb-10 underline">All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    products.map(product => <Cart key={product._id} item={product}></Cart>)
                }
            </div>
        </div>
    );
};

export default AllProduct;