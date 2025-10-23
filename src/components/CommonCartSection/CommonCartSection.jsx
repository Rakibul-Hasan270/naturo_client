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
            perView: 2,
            spacing: 15,
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: { perView: 3, spacing: 20 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 4, spacing: 25 },
            },
        },
    });

    useEffect(() => {
        let timeout;
        const next = () => {
            if (instanceRef.current) {
                instanceRef.current.moveToIdx(
                    instanceRef.current.track.details.abs + 1,
                    true
                );
            }
        };
        timeout = setInterval(() => {
            next();
        }, 2500);
        return () => clearInterval(timeout);
    }, [instanceRef]);

    if (isLoading) return <Loading />;

    return (
        <div className="my-10 max-w-6xl mx-auto">

            <div className="flex items-center gap-10 p-4">
                <p className="text-3xl font-bold">{sectionTitle}</p>
                <p className="flex items-center gap-2 cursor-pointer text-lg">
                    {subTitle} {sectionIcon}
                </p>
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