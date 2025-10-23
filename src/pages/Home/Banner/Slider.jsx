import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import banner1 from "../../../assets/Banner/banner1.jpg";
import banner2 from "../../../assets/Banner/banner2.jpg";

const Slider = () => {
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        className="mySwiper w-full h-[300px] md:h-[700px]"
        spaceBetween={0}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, EffectFade]}
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



// logo 










// img 
// https://i.ibb.co.com/WpHbcj0Q/1-KMGeablh.webp
// https://i.ibb.co.com/pBHtKyBN/F-2-KMGaua0xr.webp
// https://i.ibb.co.com/TMKt662p/B-1-KMG5awonw.webp
// https://i.ibb.co.com/nNDWzZnd/D-1-KMGbikqh.webp
// https://i.ibb.co.com/spCPQrMD/C-1-KMGizizve.webp
// https://i.ibb.co.com/Z7MjgWP/Kholisha-Honey-X-Black-Seed-Honey-KMGk2uk3n.webp
// https://i.ibb.co.com/r2LfWsyL/01-KMG5dpqlvj.webp
// https://i.ibb.co.com/SD5qkr41/honey1.webp
// https://i.ibb.co.com/DgMMdmhH/honey.webp
// https://i.ibb.co.com/ZR4Wtcw7/meswak.webp