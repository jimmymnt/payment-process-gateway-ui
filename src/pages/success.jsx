import React, {useEffect} from 'react';
import {useSearchParams} from "next/navigation";

const Success = () => {
  useEffect(() => {
    Object.keys(localStorage)
      .filter(x =>
        x.startsWith('pi_'))
      .forEach(x =>
        localStorage.removeItem(x))
  }, []);

  const params = useSearchParams();
  const paymentInfoKey = [
    'payment_intent',
    'payment_intent_client_secret',
    'redirect_status',
  ];

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Key
            </th>
            <th scope="col" className="px-6 py-3">
              Value
            </th>
          </tr>
          </thead>
          <tbody>
          {
            paymentInfoKey.length && paymentInfoKey.map(key => {
              return (
                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {key}
                  </th>
                  <td className="px-6 py-4">
                    <code>
                      {params.get(key)}
                    </code>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Success;