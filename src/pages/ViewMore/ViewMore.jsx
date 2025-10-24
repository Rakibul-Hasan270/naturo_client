import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/Loading";

const ViewMore = () => {
    const { category } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['category'],
        enabled: !!category,
        queryFn: async () => {
            try {
                const res = await axiosPublic.get(`/categorys/${category}`);
                return res.data;
            } catch (error) {
                console.log(error);
                toast.error('not fetching data || something is wrong', error?.message);
            }
        }
    })

    if (isLoading) return <Loading />;
    return (
        <div>
            <h2>view more: {products.length}</h2>
            <p className="text-red-600 text-center text-4xl">Kaj Baki ase</p>
        </div>
    );
};

export default ViewMore;