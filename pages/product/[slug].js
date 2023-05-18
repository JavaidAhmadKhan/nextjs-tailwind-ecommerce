/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";

import { Layout } from "@/components/Layout";
import data from "@/utils/data";
import { Store } from "@/utils/Store";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert("Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div className="py-2 flex items-center gap-2 bg-gray-300 w-fit mb-4 p-2 rounded">
        <Link href="/">
          <ArrowLongLeftIcon className="h-8 w-8  text-blue-400" />
        </Link>
        <span className="">Back to Products</span>
      </div>
      <div className="grid md:grid-cols-3 md:gap-2 leading-8">
        <div className="md:col-span-1">
          <Image
            className=""
            src={product.image}
            alt={product.name}
            width={360}
            height={360}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-[16px]  font-medium ">{product.name}</h1>
            </li>
            <li className="text-[16px] text-[#878787] font-medium">
              Description: {product.description}
            </li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Category: {product.category}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>₹ {product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? "In stock" : "Out of Stock"}
              </div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
