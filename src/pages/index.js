import {Index} from "@/pages/products";
import axios from "axios";

export async function getServerSideProps() {
  const response = await axios.get(`https://dummyjson.com/products?limit=10`);
  const {data} = response;

  return {
    props: {
      products: data.products,
    }
  }
}

export default function Home({products}) {
  return (
    <>
      <Index products={products}/>
    </>
  )
}