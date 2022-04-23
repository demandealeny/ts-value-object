interface CartItem {
  price: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

const aboveZero = (item: CartItem) => item.quantity > 0 && item.price > 0;
const belowInfinity = (item: CartItem) =>
  item.quantity < Infinity && item.price < Infinity;
const itemPrice = (item: CartItem) => item.quantity * item.price;
const totalItemsPrice = (total: number, price: number) => total + price;

const totalCart = (cart: Cart) => {
  return cart.items
    .filter(aboveZero)
    .filter(belowInfinity)
    .map(itemPrice)
    .reduce(totalItemsPrice, 0);
};

const cart: Cart = {
  items: [
    { price: 1, quantity: 2 },
    { price: 10, quantity: Infinity },
    { price: 100, quantity: 2 },
  ],
};

console.log(totalCart(cart));
