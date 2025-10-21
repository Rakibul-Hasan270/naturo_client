import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import banner1 from "../../../assets/Banner/6757715.jpg";
import banner2 from "../../../assets/Banner/6757728.jpg";

const Slider = () => {
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, EffectFade]}
        className="w-full h-[300px] md:h-[700px]"
      >
        {[banner1, banner2].map((img, idx) => (
          <SwiperSlide key={idx} className="w-full h-full">
            <img
              src={img}
              alt={`banner-${idx}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
