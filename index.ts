interface CartItem {
  price: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

const totalCart = (cart: Cart) => {
  return cart.items
    .map((cart) => cart.quantity * cart.price)
    .reduce((total, price) => total + price, 0);
};

const cart: Cart = {
  items: [
    { price: 1, quantity: 2 },
    { price: 10, quantity: -9 },
    { price: 100, quantity: 2 },
  ],
};

console.log(totalCart(cart));
