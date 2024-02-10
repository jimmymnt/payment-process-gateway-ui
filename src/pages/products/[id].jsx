"use client"
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
import {faCar, faCartShopping, faCreditCard} from "@fortawesome/free-solid-svg-icons";
import ProductReview from "@/components/Product/ProductReview";
import ProductQuantity from "@/components/Product/ProductQuantity";
import ProductPrice from "@/components/Product/ProductPrice";
import {Button} from "flowbite-react";
import Loading from "@/components/Loading";
import ProductCardSkeleton from "@/components/Skeletons/ProductCardSkeleton";

const ProductDetails = () => {
  const router = useRouter();
  const {id} = router.query;
  const [quantity, setQuantity] = useState(1);
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

  const setQuantityHandler = (step = 1, type = '+') => {
    setQuantity((oldValue) => {
      if (type === 'inc') {
        return oldValue + step;
      } else {
        if (oldValue < 1) {
          return 1;
        }
        return oldValue - step;
      }
    })
  }

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        if (id) {
          setLoading(true);
          const response = await api.get(`products/${id}`);
          let productRes = {
            ...response.data,
            currency: 'USD'
          }
          /**
           * Calculate discounted price.
           * 100 Euro -> discount 12%
           * -> new price would be 100 - (100 * 12 / 100)
           */
          const newPrice = parseFloat(productRes.price) - (parseFloat(productRes.price) * parseFloat(productRes.discountPercentage) / 100.0);
          productRes = {
            ...productRes,
            discountedPrice: Math.ceil(newPrice),
          }

          setProduct(productRes);
          setProductGallery(productRes.images);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct(id).then(() => setLoading(false));
  }, [id]);

  return (
    <>
      {/*<ProductCardSkeleton/>*/}
      {
        loading && product.id === undefined ?
          <ProductCardSkeleton/>
          :
          <section className="text-gray-700 body-font overflow-hidden product-details">
            <div className="py-4 mx-auto">
              <div className="mx-auto flex flex-wrap">
                {
                  product &&
                  <ProductImage images={productGallery}/>
                }
                <div className="md:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2
                    className="text-sm title-font text-gray-500 tracking-widest dark:text-gray-400">{product.brand}</h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium my-3 rounded-xl dark:text-gray-200">
                    {product.title}
                  </h1>

                  <div className="my-4">
                    <ProductCategory product={product}/>
                  </div>

                  <div className="flex">
                    <ProductReview/>
                  </div>

                  <ProductPrice product={product}/>

                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <div className="p-2">
                      <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                        <div className="text-gray-700 dark:text-gray-200">
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

                  <ProductQuantity
                    setQuantityHandler={setQuantityHandler}
                    quantity={quantity}
                  />
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button isProcessing={false}
                            className="md:w-fit sm:w-full xs:w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30">
                      <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5 mr-2"/>
                      <span>Add to cart</span>
                    </Button>

                    <Button color={'blue'} className="md:w-fit sm:w-full xs:w-full">
                      <span>Buy now</span>
                    </Button>
                  </div>
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
      }
    </>
  );
};

export default ProductDetails;