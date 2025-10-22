import { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import useAllItem from "../../../hooks/useAllItem";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Cart from "../../../components/Cart/Cart";

const BestSeller = () => {
  const [products, isLoading] = useAllItem();

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
      <h2 className="text-3xl font-bold text-center mb-6">
        OUR BEST SELLERS
      </h2>

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

export default BestSeller;
