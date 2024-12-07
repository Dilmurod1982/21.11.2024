import { create } from "zustand";
import { produce } from "immer";

const stateFromLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem("mohinur")) || {
      user: null,
      isAuthReady: false,
      products: [],
      totalProducts: 0,
      totalPrice: 0,
    }
  );
};

const persistMiddleware = (config) => (set, get, api) =>
  config(
    (args) => {
      set(args);
      localStorage.setItem("mohinur", JSON.stringify(get()));
    },
    get,
    api
  );

export const useAppStore = create(
  persistMiddleware((set) => ({
    ...stateFromLocalStorage(),
    setUser: (user) => set((state) => ({ user })),
    setIsAuthReady: (isAuthReady) => set((state) => ({ isAuthReady })),
    setProducts: (newProduct) =>
      set((state) => {
        const existingProductIndex = state.products.findIndex(
          (product) => product.id == newProduct.id
        );

        let updateProducts;

        if (existingProductIndex != -1) {
          updateProducts = state.products.map((product, index) =>
            index == existingProductIndex
              ? { ...product, amount: product.amount + newProduct.amount }
              : product
          );
        } else {
          updateProducts = [
            ...state.products,
            { ...newProduct, amount: newProduct.amount || 1 },
          ];
        }
        const totalProducts = updateProducts.reduce(
          (acc, product) => acc + product.amount,
          0
        );
        const totalPrice = updateProducts.reduce(
          (acc, product) => acc + product.price * product.amount,
          0
        );
        return { products: updateProducts, totalProducts, totalPrice };
      }),
    clearCart: () =>
      set(() => ({ products: [], totalProducts: 0, totalPrice: 0 })),
    incrementProducts: (id) =>
      set((state) =>
        produce(state, (draft) => {
          const product = draft.products.find((product) => product.id == id);
          if (product) {
            product.amount += 1;
            draft.totalProducts += 1;
            draft.totalPrice += product.price;
          }
        })
      ),
    decrementProducts: (id) =>
      set((state) =>
        produce(state, (draft) => {
          const product = draft.products.find((product) => product.id == id);
          if (product && product.amount > 1) {
            product.amount -= 1;
            draft.totalProducts -= 1;
            draft.totalPrice -= product.price;
          } else if (product && product.amount == 1) {
            draft.products = draft.products.filter((p) => p.id != id);
            draft.totalProducts -= 1;
            draft.totalPrice -= product.price;
          }
        })
      ),
    setTotalProducts: (totalProducts) => set((state) => ({ totalProducts })),
    setTotalPrice: (totalPrice) => set((state) => ({ totalPrice })),
  }))
);
