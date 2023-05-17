/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex items-center justify-between px-2 gap-2 mt-2">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className=""> {product.brand}</p>
      </div>
      <div className="flex items-center justify-between gap-2 px-2">
        <p className=""> ₹{product.price}</p>
        <button
          className="primary-button"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
