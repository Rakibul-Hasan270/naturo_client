import { IoIosArrowForward } from "react-icons/io";
import CommonCartSection from "../../../components/CommonCartSection/CommonCartSection";
import Slider from "../Banner/Slider";
import MarqueCategory from "../MarqueCategory/MarqueCategory";
import useAllItem from "../../../hooks/useAllItem";
import AllProduct from "../AllProduct/AllProduct";

const Home = () => {
    const [products, isLoading] = useAllItem();
    return (
        <div>
            <Slider></Slider>
            <MarqueCategory></MarqueCategory>

            {/* Honey section  */}
            <CommonCartSection sectionTitle='OUR BEST SELLERS' products={products} isLoading={isLoading}></CommonCartSection>
            
            {/* Honey section  */}
            <CommonCartSection sectionIcon={<IoIosArrowForward />} sectionTitle='Honey' subTitle='View More' products={products} isLoading={isLoading}></CommonCartSection>

            {/* Wellness section  */}
            <CommonCartSection sectionIcon={<IoIosArrowForward />} sectionTitle='Wellness' subTitle='View More' products={products} isLoading={isLoading}></CommonCartSection>

            {/* all product section */}
            <AllProduct></AllProduct>
        </div>
    );
};

export default Home;