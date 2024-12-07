import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Link
      to={`/singleProduct/${product.id}`}
      className="card bg-base-100 w-full shadow-xl"
    >
      <figure>
        <img src={product.thumbnail} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
