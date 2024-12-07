import { customFetch } from "../utils/index";
import ProductsList from "../components/ProductsList";

export const loader = async () => {
  const request = await customFetch();
  const products = request.data;

  return { products };
};

function Home() {
  return (
    <div className="align-elements">
      <ProductsList />
    </div>
  );
}

export default Home;
