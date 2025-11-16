"use client";

export default function ProductTable() {
  return (
    <table className="w-full text-left">
      <thead className="">
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Images</th>
        </tr>
      </thead>

      <tbody className="border-t px-4">
        <tr>
          <td>Sample Product</td>
          <td>$100</td>
          <td>10%</td>
          <td>50</td>
          <td>Sample Category</td>
          <td>image2.jpg</td>
        </tr>

        <tr>
          <td>Sample Product 2</td>
          <td>$80</td>
          <td>0%</td>
          <td>28</td>
          <td>Sample Category 2</td>
          <td>image1.jpg</td>
        </tr>
      </tbody>
    </table>
  );
}
