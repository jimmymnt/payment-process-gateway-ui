import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import {createPaymentIntent} from "@/utils/paymentIntent.service";
import {getPublishableKey} from "@/utils/stripe.service";
import {useRouter} from "next/router";

const ProductDetails = () => {
  const router = useRouter();
  const {id} = router.query;
  const [product, setProduct] = useState({});
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
          const response = await axios.get(`https://dummyjson.com/products/${id}`);
          const productRes = {
            ...response.data,
            currency: 'USD'
          }

          setProduct(productRes);
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
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce"
                 className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                 src={product.thumbnail}/>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
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
                    <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                         fill="none"
                         viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                              strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                  }
                  {loading ? 'Loading' : 'Pay with Stripe'}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*End homepage*/}

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