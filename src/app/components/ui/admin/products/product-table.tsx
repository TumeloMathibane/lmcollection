import type { Product } from "@/(overview)/collection/products/types";
import Link from "next/link";

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <table className="min-w-full divide-y divide-stone-200">
      <thead className="bg-stone-50 sticky top-0">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
            Product Name ({products?.length})
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
            Price
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
            Stock
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-stone-200">
        {products.map((product) => (
          <tr key={product._id} className="hover:bg-stone-50 cursor-pointer">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
              <Link href={`/admin/products/${product._id}`}>
                {product.name}
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 before:content-['R'] before:mr-1">
              {product.price}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
              {product.quantity}
            </td>
          </tr>
        ))}

        {/* {Array.from({ length: 20 }).map((_, index) => (
          <tr key={index} className="h-10">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
              Product {index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 before:content-['R'] before:mr-1">
              {Math.floor(Math.random() * 1000)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
              {Math.floor(Math.random() * 100)} units
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
}
