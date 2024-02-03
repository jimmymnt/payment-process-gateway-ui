import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Pagination from "@/components/Pagination";
import SearchProducts from "@/components/SearchProducts";
import Link from "next/link";
import Loading from "@/components/Loading";
import api from "@/utils/Api";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const router = useRouter();
  let {page} = router.query;

  const paginate = () => setLoading(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (page !== undefined) {
          setLoading(true);
          const response = await api.get(`/products?skip=${(page - 1) * 10}&limit=${limit}`);

          const {data} = response;
          setProducts(data.products);
          setTotal(data.total);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts().then();
  }, [page, limit]);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  return (
    <div className="py-14 sm:py-14 lg:max-w-7xl">
      <SearchProducts/>
      <Loading loading={loading}>
        <div
          className="items-center my-8 p-6 bg-white border border-gray-100 rounded-lg shadow-md grid grid-cols-1 gap-x-6 gap-y-10 mt-10 mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
  );
};

export default Page;