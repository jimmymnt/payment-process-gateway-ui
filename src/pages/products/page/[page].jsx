import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import Pagination from "@/components/Pagination";
import SearchProducts from "@/components/SearchProducts";
import Link from "next/link";
import Loading from "@/components/Loading";

export async function getServerSideProps(context) {
  const {params} = context;
  let {page} = params;
  const limit = 10;
  const response = await axios.get(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=${limit}`);
  const {data} = response;

  return {
    props: {
      products: data.products,
      total: data.total,
      limit,
      page: page,
    }
  }
}

const Page = ({products, total, limit}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let {page} = router.query;

  const paginate = () => setLoading(true);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <SearchProducts/>
        <Loading loading={loading}>
          <div
            className="grid grid-cols-1 gap-x-6 gap-y-10 mt-10 mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {
              products && products.map(product => {
                return (
                  <div key={product.id}>
                    <Link href={`/products/${product.id}`}>
                      <div
                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img src={product.thumbnail}
                             alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                             className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </Loading>
        <h2 className="sr-only">Products</h2>
        <Pagination
          paginate={paginate}
          currentPage={page}
          postsPerPage={limit}
          totalPosts={total}
        />
      </div>
    </>
  );
};

export default Page;