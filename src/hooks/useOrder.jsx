import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useOrder = () => {
    const axiosPublic = useAxiosPublic();

    const { data: order = [], isLoading, refetch } = useQuery({
        queryKey: ['order'],
        queryFn: async () => {
            const result = await axiosPublic.get('/order');
            return result.data;
        }
    })

    return [order, isLoading, refetch];
};

export default useOrder;