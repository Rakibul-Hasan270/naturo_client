import { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import useAllItem from "../../../hooks/useAllItem";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";

const MarqueCategory = () => {
  const [products, isLoading] = useAllItem();

  const uniqueCategories = Array.from(
    new Map(
      products.map((item) => [item.category, item])
    ).values()
  );

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    renderMode: "performance",
    drag: true,
    slides: {
      perView: 10,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 6, spacing: 20 },
      },
      "(max-width: 768px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 3, spacing: 8 },
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
    const autoPlay = () => {
      timeout = setInterval(() => {
        next();
      }, 2500);
    };
    autoPlay();
    return () => clearInterval(timeout);
  }, [instanceRef]);


  if (isLoading) return <Loading />;
  return (
    <div className="bg-[#CAE9D7] py-4">
      <div ref={sliderRef} className="keen-slider max-w-7xl mx-auto flex justify-center">
        {uniqueCategories.map((item, i) => (
          <Link to={`/view-more/${item.category}`}
            key={i}
            className="keen-slider__slide font-semibold flex flex-col items-center justify-center h-20 text-center"
          >
            <img
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
              src={item.logo}
              alt={item.category}
            />
            <h2 className="text-gray-700 hover:text-[#5caa7b]">
              {item.category}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarqueCategory;
