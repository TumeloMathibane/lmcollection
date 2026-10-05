import type { Product } from "@/(overview)/collection/products/types";

export default function Modal({
  product,
  onClose
}: {
  product: Product;
  isOpen: boolean;
  onClose: (isModalOpen: boolean) => void;
}) {
  const handleModalClose = () => {
    onClose(false);
  };

  return (
    <div className="w-full h-full fixed inset-0 p-2 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-xl font-bold mb-4">{product.name}</h2>
        <p className="mb-2">Price: {product.price}</p>
        <p className="mb-2">Availability: {product.availability}</p>
        <p className="mb-2">Category: {product.category}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleModalClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
