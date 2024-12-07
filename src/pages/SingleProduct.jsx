import { Link, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/index";
import { useEffect, useState } from "react";
import { useAppStore } from "../lib/zustand";

export const loader = async ({ params }) => {
  const request = await customFetch(`${params.id}`);
  const product = request.data;

  return { product };
};

function SingleProduct() {
  const products = useAppStore((state) => state.products);
  const setProducts = useAppStore((state) => state.setProducts);

  const { product } = useLoaderData();
  const handleToCart = () => {
    const newProduct = {
      ...product,
      amount,
    };
    setProducts(newProduct);
  };

  const [amount, setAmount] = useState(0);
  return (
    <div className="align-elements mt-10">
      <h3>{product.title}</h3>
      <img src={product.thumbnail} alt="" />
      <div className="flex items-center gap-5">
        <button
          disabled={amount == 0 && true}
          onClick={() => setAmount(amount - 1)}
          className="btn btn-accent"
        >
          -
        </button>
        <p className="text-2xl">{amount}</p>
        <button
          disabled={amount == product.stock && true}
          onClick={() => setAmount(amount + 1)}
          className="btn btn-primary"
        >
          +
        </button>
        <button onClick={handleToCart} className="btn btn-primary">
          Add to Cart
        </button>
      </div>

      <Link to="/" className="btn btn-primary mt-5">
        GO TO HOME
      </Link>
    </div>
  );
}

export default SingleProduct;
