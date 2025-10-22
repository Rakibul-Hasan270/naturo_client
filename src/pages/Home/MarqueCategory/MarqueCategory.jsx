import { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import useAllItem from "../../../hooks/useAllItem";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";

const MarqueCategory = () => {
  const [items, isLoading] = useAllItem();

  // keen-slider setup
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    renderMode: "performance",
    slides: {
      perView: 6,      // একসাথে কয়টা আইটেম দেখাবে
      spacing: 15,     // slide gap
    },
  });

  // autoplay effect
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
      }, 2500); // প্রতি ১.৫ সেকেন্ডে slide move করবে
    };
    autoPlay();
    return () => clearInterval(timeout);
  }, [instanceRef]);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-cyan-900 py-4">
      <div
        ref={sliderRef}
        className="keen-slider max-w-6xl mx-auto"
      >
        {items.map((item, i) => (
          <Link
            key={i}
            className="keen-slider__slide 
                       border border-white/20 rounded-lg 
                       text-white font-semibold 
                       flex justify-center items-center 
                       max-w-[120px] h-[60px] 
                       text-center"
          >
            {item.category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarqueCategory;
