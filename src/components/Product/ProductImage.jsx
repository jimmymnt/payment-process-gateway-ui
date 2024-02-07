"use client"
import {useState, useRef, useEffect} from 'react'
import {Carousel} from "flowbite-react";

const ProductImage = ({images}) => {
  const [mainImg, setMainImg] = useState(null)
  const ref = useRef();

  function scroll(scrollOffset) {
    ref.current.scrollLeft += scrollOffset
  }

  useEffect(() => {
    setMainImg(images[0]);
  }, [images]);

  return (
    <div
      className="w-full md:w-1/2 bg-white rounded dark:border-gray-600 dark:bg-gray-800 product-gallery-image">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={4000}>
          {
            images && images.map((imgItem, index) => {
              return (
                  <img key={index} src={imgItem} alt="..."/>
              )
            })
          }
        </Carousel>
      </div>
    </div>
  )
}

export default ProductImage;