import type { Product } from "@/(overview)/collection/products/types";
import Link from "next/link";

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <table className="divide-y divide-stone-200 w-full table-fixed">
      <thead className="bg-stone-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
            Name ({products?.length})
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
            <td className="px-6 py-4 text-sm text-stone-900">
              <Link href={`/admin/products/${product._id}`}>
                {product.name}
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
              {new Intl.NumberFormat("en-ZA", {
                style: "currency",
                currency: "ZAR",
              }).format(product.price)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
              {product.quantity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
