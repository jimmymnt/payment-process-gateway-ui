import React, {useEffect, useState} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import {createPaymentIntent} from "@/utils/paymentIntent.service";
import {getPublishableKey} from "@/utils/stripe.service";
import {useRouter} from "next/router";
import api from "@/utils/Api";
import ProductImage from "@/components/Product/ProductImage";
import ProductCategory from "@/components/Product/ProductCategory";
import LoadingAnimation from "@/components/Utils/LoadingAnimation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faCreditCard, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

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
      const paymentIntentInfo = localStorage.getItem(`pi_${product.id}`);
      if (!paymentIntentInfo) {
        const paymentIntent = await createPaymentIntent(product);
        localStorage.setItem(`pi_${product.id}`, JSON.stringify(paymentIntent.data));
        setClientSecret(paymentIntent.data.client_secret);
      } else {
        const data = JSON.parse(paymentIntentInfo);
        setClientSecret(data.client_secret);
      }

      /// The payment form needs to be waited until the Payment Intent is created.
      setLoadStripeComponent((oldValue) => !oldValue);
      setLoading(false);
    }, secDelay);
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
    <section className="text-gray-700 body-font overflow-hidden">
      <div className="container py-4 mx-auto">
        <div className="mx-auto flex flex-wrap">
          {
            product &&
            <ProductImage images={productGallery}/>
          }
          <div className="md:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest dark:text-gray-400">{product.brand}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium my-3 rounded-xl dark:text-gray-200">
              {product.title}
            </h1>

            <div className="my-4">
              <ProductCategory product={product}/>
            </div>

            <div className="flex">
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
                    <span className="text-gray-600 ml-3 dark:text-gray-200">4 Reviews</span>
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

            <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-200 my-4">
              <span>{product.currency} {product.price}</span>
              <span
                className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-300">
                  {product.currency} {product.price}
                </span>
            </p>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
              <div className="p-2">
                <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                  <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 dark:text-gray-200">
                    {
                      product.description
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6 my-6 border-t border-b border-gray-200 dark:border-gray-700">
              <p className="dark:text-gray-200">In stock: {product.stock}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="quantity-input"
                     className="block mb-2 text-gray-900 dark:text-white">
                Quantity:
              </label>
              <div className="relative flex items-center max-w-[8rem]">
                <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input"
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <FontAwesomeIcon icon={faMinus} className="text-gray-900 dark:text-white"/>
                </button>
                <input type="text" id="quantity-input" data-input-counter="" aria-describedby="helper-text-explanation"
                       className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="1" required/>
                <button type="button" id="increment-button" data-input-counter-increment="quantity-input"
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <FontAwesomeIcon icon={faPlus} className="text-gray-900 dark:text-white"/>
                </button>
              </div>
              <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                Please select a 5 digit number from 0 to 9.
              </p>
            </div>
            <button type="button"
                    className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
              <FontAwesomeIcon icon={faCartShopping} className="file: mr-2 h-6 w-6"/>
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
                  <FontAwesomeIcon icon={faCreditCard} className="file: mr-2 h-6 w-6"/>
              }
              <span>{loading ? 'Loading' : 'Pay with Stripe'}</span>
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
  );
};

export default ProductDetails;