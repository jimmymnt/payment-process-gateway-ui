import axiosInstance from "@/utils/axios.instance.utils";

export const createPaymentIntent = async (product) => {
  return await axiosInstance.post('/payment-intents', {
    amount: product.price,
    description: product.description,
    currency: product.currency,
  });
}