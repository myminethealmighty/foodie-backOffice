import { CartItem } from "@/types/cart";

export const generateRandomId = () =>
  (Math.random() + 1).toString(36).substring(7);
/*
The above function gives the string output.
The below function gives the void output.

export const generateRandomId = () =>{
  (Math.random() + 1).toString(36).substring(7)};
*/

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((prev, curr) => {
    const menuPrice = curr.menu.price;
    const totalAddonPrice = curr.addons.reduce(
      (addonPrice, addon) => (addonPrice += addon.price),
      0
    );
    prev += (menuPrice + totalAddonPrice) * curr.quantity;
    return prev;
  }, 0);
  return totalPrice;
};
