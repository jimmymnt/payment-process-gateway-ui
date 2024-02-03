import Link from "next/link";
import {ProtectRoute} from "@/contexts/auth";

const Home = () => {
  return (
    <>
      <Link href={'/products/page/1'}>Shop</Link>
    </>
  )
}
export default Home;