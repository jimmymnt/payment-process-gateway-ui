import {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'

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
    <div className="w-full md:w-1/2 border border-palette-lighter bg-white rounded shadow-lg">
      <div className="relative h-96">
        {
          mainImg && <Image
            src={mainImg}
            alt={mainImg}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transform cursor-pointer"
          />}
      </div>
      <div className="relative flex border-t border-palette-lighter">
        <button
          aria-label="left-scroll"
          className="h-32 bg-palette-lighter hover:bg-palette-light  absolute left-0 z-10 opacity-75"
          onClick={() => scroll(-300)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3 mx-1 text-palette-primary"/>
        </button>
        <div
          ref={ref}
          style={{scrollBehavior: "smooth"}}
          className="flex space-x-1 w-full overflow-auto border-t border-palette-lighter"
        >
          {
            images && images.map((imgItem, index) => (
              <button
                key={index}
                className="relative w-40 h-32 flex-shrink-0 rounded-sm "
                onClick={() => setMainImg(imgItem)}
              >
                <Image
                  src={imgItem}
                  alt={imgItem}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </button>
            ))
          }
        </div>
        <button
          aria-label="right-scroll"
          className="h-32 bg-palette-lighter hover:bg-palette-light  absolute right-0 z-10 opacity-75"
          onClick={() => scroll(300)}
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-3 mx-1 text-palette-primary"/>
        </button>
      </div>
    </div>
  )
}

export default ProductImage;