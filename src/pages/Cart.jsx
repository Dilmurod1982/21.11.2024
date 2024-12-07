import { useAppStore } from "../lib/zustand";

import { TableItem } from "../components";
import { useEffect } from "react";

function Cart() {
  const user = useAppStore((state) => state.user);
  const products = useAppStore((state) => state.products);
  const totalProducts = useAppStore((state) => state.totalProducts);
  const totalPrice = useAppStore((state) => state.totalPrice);

  useEffect(() => {
    totalPrice;
  }, [totalPrice]);
  return (
    <div className="align-elements mt-10">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Title</th>
              <th>Price</th>
              <th>Change Amount</th>
              <th>Total price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((prod) => {
              return <TableItem key={prod.id} prod={prod} />;
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Price</th>
              <th>Change Amount</th>
              <th>Total: {totalPrice.toFixed(2)} </th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Cart;
