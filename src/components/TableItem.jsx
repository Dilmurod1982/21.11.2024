import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAppStore } from "../lib/zustand";

function TableItem({ prod }) {
  const incrementProducts = useAppStore((state) => state.incrementProducts);
  const decrementProducts = useAppStore((state) => state.decrementProducts);

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={prod.thumbnail} alt={prod.title} />
            </div>
          </div>
          <div>
            <div className="font-bold">{prod.title}</div>
            <div className="text-sm opacity-50">{prod.brand}</div>
          </div>
        </div>
      </td>
      <td>
        ${prod.price}
        <br />
        <span className="badge badge-ghost badge-sm line-through">
          $
          {((prod.price / (100 - `${prod.discountPercentage}`)) * 100).toFixed(
            2
          )}
        </span>
      </td>
      <td className="flex items-center gap-3">
        <button
          onClick={() => decrementProducts(prod.id)}
          className="btn btn-accent btn-sm"
        >
          -
        </button>
        <p>{prod.amount}</p>
        <button
          onClick={() => incrementProducts(prod.id)}
          className="btn btn-accent btn-sm"
        >
          +
        </button>
      </td>
      <td>{(prod.amount * prod.price).toFixed(2)}</td>
      <th>
        <button className="btn  btn-sm">
          <FaRegTrashCan className="w-5 h-5" />
        </button>
      </th>
    </tr>
  );
}

export default TableItem;
