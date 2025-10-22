import Slider from "../Banner/Slider";
import BestSeller from "../BestSeller/BestSeller";
import MarqueCategory from "../MarqueCategory/MarqueCategory";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <MarqueCategory></MarqueCategory>
            <BestSeller></BestSeller>
        </div>
    );
};

export default Home;