import React, {useEffect, useState} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import {createPaymentIntent} from "@/utils/paymentIntent.service";
import {getPublishableKey} from "@/utils/stripe.service";
import {useRouter} from "next/router";
import api from "@/utils/Api";
import ProductCarouselThumbs from "@/components/Product/ProductCarouselThumbs";
import ProductImage from "@/components/Product/ProductImage";
import ProductCategory from "@/components/Product/ProductCategory";
import Loading from "@/components/Loading";
import LoadingAnimation from "@/components/Utils/LoadingAnimation";

const ProductDetails = () => {
  const router = useRouter();
  const {id} = router.query;
  const [product, setProduct] = useState({});
  const [productGallery, setProductGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [loadStripeComponent, setLoadStripeComponent] = useState(false);

  const stripePromise = getPublishableKey();

  const options = {
    clientSecret,
  };

  const loadPaymentForm = async (event) => {
    setLoading(true);
    const secDelay = loadStripeComponent ? 0 : 1000;
    setTimeout(async () => {
      event.preventDefault();
      // const paymentIntentInfo = localStorage.getItem(`pi_${product.id}`);
      // if (!paymentIntentInfo) {
      //   const paymentIntent = await createPaymentIntent(product);
      //   localStorage.setItem(`pi_${product.id}`, JSON.stringify(paymentIntent.data));
      //   setClientSecret(paymentIntent.data.client_secret);
      // } else {
      //   const data = JSON.parse(paymentIntentInfo);
      //   setClientSecret(data.client_secret);
      // }

      /// The payment form needs to be waited until the Payment Intent is created.
      // setLoadStripeComponent((oldValue) => !oldValue);
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        if (id) {
          const response = await api.get(`/products/${id}`);
          const productRes = {
            ...response.data,
            currency: 'USD'
          }

          setProduct(productRes);
          setProductGallery(productRes.images);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct(id).then();
  }, [id]);

  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden">
        <div className="container py-4 mx-auto">
          <div className="mx-auto flex flex-wrap">
            {
              product &&
              <ProductImage images={productGallery}/>
            }
            <div className="md:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>

              <ProductCategory product={product}/>

              <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                         strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                         strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                         strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                         strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                           className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                           className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                           className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="my-4">
                <p>In stock: {product.stock}</p>
              </div>
              <div className="flex mt-5">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {`${product.currency} ${product.price}`}
                </span>
                <button type="button"
                        onClick={loadPaymentForm}
                        className={`flex items-center ml-auto px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow hover:bg-blue-400`}
                        disabled={loading}>
                  {
                    loading &&
                    <LoadingAnimation/>
                  }
                  {loading ? 'Loading' : 'Pay with Stripe'}
                </button>
              </div>
              <button type="button"
                      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="file: mr-2 h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
                <span>Add to cart</span>
              </button>
              <button type="button"
                      disabled={loading}
                      onClick={loadPaymentForm}
                      className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
                {
                  loading ?
                    <LoadingAnimation/>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="file: mr-2 h-6 w-6" viewBox="0 0 8 8">
                      <path fill="currentColor"
                            d="M2.25 1C.11 1 0 1.11 0 1.25V2h8v-.75C8 1.11 7.89 1 7.75 1zM0 3v3.75c0 .14.11.25.25.25h7.5c.14 0 .25-.11.25-.25V3zm1 2h1v1H1zm2 0h1v1H3z"/>
                    </svg>
                }
                <span>Pay with Stripe</span>
              </button>
            </div>
          </div>
        </div>

        {
          loadStripeComponent &&
          <Elements stripe={stripePromise} options={options}>
          <h2
              className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-600 md:text-5xl lg:text-4xl text-center">
              Lets make a payment
            </h2>
            <CheckoutForm product={product}/>
          </Elements>
        }
      </section>
    </div>
  );
};

export default ProductDetails;