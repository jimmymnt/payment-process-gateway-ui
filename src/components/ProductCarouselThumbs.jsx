import Image from "next/image";
import {Navigation, FreeMode, Swiper, Pagination, SwiperSlide, Thumbs} from "@/utils/Swiper";

export default function ProductCarouselThumbs({gallery, thumbsSwiper, setThumbsSwiper}) {
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        thumbs={{swiper: thumbsSwiper}}
        modules={[FreeMode, Navigation, Pagination, Thumbs]}
        className={'product-images-preview'}
      >
        {gallery?.map((item, index) => (
          <SwiperSlide
            key={`product-gallery-${index}`}
            className="flex justify-center items-center"
          >
            <Image
              src={item}
              alt={`Product gallery ${item}`}
              width={450}
              height={450}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="max-w-md mt-5 lg:mt-8 mx-auto relative lg:pb-2">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {gallery?.map((item, index) => {
            return (
              <SwiperSlide
                key={`product-thumb-gallery-${index}`}
                className="flex items-center justify-center cursor-pointer rounded overflow-hidden border border-border-200 border-opacity-75 hover:opacity-75"
                onClick={() => console.log('image changed')}
              >
                <Image
                  src={item}
                  alt={`Product thumb gallery ${item}`}
                  width={100}
                  height={100}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  );
}
