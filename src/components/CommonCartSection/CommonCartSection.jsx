import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";
import Cart from "../Cart/Cart";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

const CommonCartSection = ({ sectionTitle, sectionIcon, products, isLoading, subTitle, isInsideDrawer }) => {
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        mode: "free",
        renderMode: "performance",
        drag: true,
        slides: {
            perView: isInsideDrawer ? 2 : 4,
            spacing: isInsideDrawer ? 10 : 25,
        },
        breakpoints: {
            "(max-width: 600px)": {
                slides: { perView: 2, spacing: 10 }
            },
            "(min-width: 768px)": {
                slides: { perView: isInsideDrawer ? 2 : 3, spacing: isInsideDrawer ? 15 : 20 }
            },
            "(min-width: 1024px)": {
                slides: { perView: isInsideDrawer ? 2 : 4, spacing: isInsideDrawer ? 15 : 25 }
            },
        },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (instanceRef.current) {
                instanceRef.current.moveToIdx(
                    instanceRef.current.track.details.abs + 1,
                    true
                );
            }
        }, 2500);
        return () => clearInterval(interval);
    }, [instanceRef]);

    if (isLoading) return <Loading />;

    return (
        <div className={`md:my-8 ${isInsideDrawer ? "w-full" : "max-w-7xl mx-auto"}`}>
            <div className="flex items-center gap-2 md:gap-10 mt-6 md:mt-16 md:mb-4">
                <p className="text-xl md:text-3xl font-bold">{sectionTitle}</p>
                <Link to={`/view-more/${sectionTitle}`} className="flex items-center gap-2 cursor-pointer text-lg">
                    {subTitle} {sectionIcon}
                </Link>
            </div>

            <div ref={sliderRef} className="keen-slider">
                {products.map((item) => (
                    <div key={item._id} className="keen-slider__slide">
                        <Cart item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonCartSection;