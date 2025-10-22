import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import toast from "react-hot-toast";

const useAllItem = () => {
    const axiosPublic = useAxiosPublic();

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['all_items'],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get('/items');
                return res.data;
            } catch (error) {
                console.log(error);
                toast.error('not fetching data || something is wrong', error?.message);
            }
        }
    })
    return [products, isLoading, refetch];
};

export default useAllItem;