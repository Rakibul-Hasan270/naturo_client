import { useEffect, useState } from "react";
import useAllItem from "./useAllItem";

const useRecentlyViewed = () => {
    const [products, isLoading] = useAllItem();
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

    useEffect(() => {
        const viewedIds = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
        if (viewedIds.length > 0) {
            const filtered = products.filter((item) => viewedIds.includes(item._id));
            setRecentlyViewedProducts(filtered.reverse());
        }
    }, [products]);

    return [recentlyViewedProducts, isLoading];
};

export default useRecentlyViewed;