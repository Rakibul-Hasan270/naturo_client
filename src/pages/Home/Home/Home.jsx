import { IoIosArrowForward } from "react-icons/io";
import CommonCartSection from "../../../components/CommonCartSection/CommonCartSection";
import Slider from "../Banner/Slider";
import MarqueCategory from "../MarqueCategory/MarqueCategory";
import useAllItem from "../../../hooks/useAllItem";
import AllProduct from "../AllProduct/AllProduct";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import useRecentlyViewed from "../../../hooks/useRecentlyViewed";

const Home = () => {
    const [products, isLoading] = useAllItem();
    const [recentlyViewedProducts] = useRecentlyViewed();
    return (
        <div>
            <Slider></Slider>
            <MarqueCategory></MarqueCategory>
            
            {/* best sells section  */}
            <CommonCartSection sectionTitle='OUR BEST SELLERS' products={products.filter(p => p.best_sell === true)} isLoading={isLoading}></CommonCartSection>

            {/* Honey section  */}
            <CommonCartSection sectionIcon={<IoIosArrowForward />} sectionTitle='Honey' subTitle='View More' products={products} isLoading={isLoading}></CommonCartSection>

            {/* Wellness section  */}
            <CommonCartSection sectionIcon={<IoIosArrowForward />} sectionTitle='Wellness' subTitle='View More' products={products} isLoading={isLoading}></CommonCartSection>

            {/* all product section */}
            <AllProduct></AllProduct>

            {/* recently viewed section  */}
            {recentlyViewedProducts.length > 0 && <CommonCartSection sectionTitle='Recently Viewed' products={recentlyViewedProducts} isLoading={isLoading}></CommonCartSection>}

            {/* featured section  */}
            <FeaturedSection></FeaturedSection>
        </div>
    );
};

export default Home;