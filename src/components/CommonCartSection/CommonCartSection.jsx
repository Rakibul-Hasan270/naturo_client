import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";
import Cart from "../Cart/Cart";
import Loading from "../Loading/Loading";

const CommonCartSection = ({ sectionTitle, sectionIcon, products, isLoading, subTitle }) => {

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        mode: "free",
        renderMode: "performance",
        drag: true,
        slides: {
            perView: 2, // default (mobile-first)
            spacing: 10,
        },
        breakpoints: {
            "(max-width: 600px)": {
                slides: { perView: 2, spacing: 10 }, // 👈 small device
            },
            "(min-width: 768px)": {
                slides: { perView: 3, spacing: 20 }, // 👈 tablet
            },
            "(min-width: 1024px)": {
                slides: { perView: 4, spacing: 25 }, // 👈 desktop
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
        <div className="my-10 max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <p className="text-3xl font-bold">{sectionTitle}</p>
                <p className="flex items-center gap-2 cursor-pointer text-lg text-gray-700 dark:text-gray-300">
                    {subTitle} {sectionIcon}
                </p>
            </div>

            {/* Slider */}
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
