import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useState} from "react";

const CheckoutForm = (props) => {
  const {product} = props;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  console.log(product.id);
  const handlePayment = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3001/success",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      setLoading(false);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    console.log('Here we go');
  }

  return (
    <>
      <form style={{
        width: '400px',
        margin: 'auto',
      }} onSubmit={handlePayment}>
        <PaymentElement/>
        <button type="button"
                className={`my-4 w-full ml-auto px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md shadow hover:bg-blue-400`}
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
          {loading ? 'Loading' : 'Submit'}
        </button>
      </form>
    </>
  );
}

export default CheckoutForm;