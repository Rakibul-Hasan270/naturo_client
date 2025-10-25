import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/Loading";
import Cart from '../../components/Cart/Cart';
import { useLoadingBar } from "../../provider/LoadingBarProvider/LoadingBarProvider";

const ViewMore = () => {
    const { category } = useParams();
    const axiosPublic = useAxiosPublic();
    const { start, complete } = useLoadingBar();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['category'],
        enabled: !!category,
        queryFn: async () => {
            start();
            try {
                const res = await axiosPublic.get(`/categorys/${category}`);
                complete();
                return res.data;
            } catch (error) {
                console.log(error);
                toast.error('not fetching data || something is wrong', error?.message);
            }
        }
    })
    console.log(products);
    if (isLoading) return <Loading />;
    return (
        <div className="max-w-7xl mx-auto mt-12 mb-12">
            <h2 className="text-center text-3xl font-bold mb-12">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {
                    products.map(product => <Cart key={product._id} item={product}></Cart>)
                }
            </div>
        </div>
    );
};

export default ViewMore;