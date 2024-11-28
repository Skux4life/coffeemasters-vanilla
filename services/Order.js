import { getProductById } from "./Menu.js";

export async function addToCart(id) {
  const product = await getProductById(id);
  const results = app.store.cart.filter(
    (productInCart) => productInCart.product.id == id,
  );
  if (results.length == 1) {
    // the product is already in the cart so we need to increase the quantity
    app.store.cart = app.store.cart.map((product) =>
      product.id == id ? { ...p, quantity: p.quantity + 1 } : p,
    );
  } else {
    // we need to create a new array so that the Proxy will trap the cart changed event
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
  // if we dispatch the event then we could manipulate the array in place
  // document.dispatchEvent(new CustomEvent("appcartchange"));
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter(
    (productInCart) => productInCart.product.id != id,
  );
}
