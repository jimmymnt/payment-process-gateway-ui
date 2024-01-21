import {loadStripe} from "@stripe/stripe-js";

export const getPublishableKey = () => {
  return loadStripe("pk_test_51OaYvSEqDTJmclkiKEPxCysPFVtDF9Jmzx7TvRE84ixwcZyp0wuReB2yAeNxqzAIfjERI29LCgJlQgBuOwKJNd8p00Xa6YS9Dg");
}