import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
  const {product, clientSecret} = props;
  const stripe = useStripe();
  const elements = useElements();
  console.log(product.price);
  const handlePayment = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

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
        <button className="btn-submit text-white">Submit</button>
        <a className="text-gray-500">Cancel</a>
      </form>
    </>
  );
}

export default CheckoutForm;