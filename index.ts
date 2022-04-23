interface Quantity {
  value: number;
}

interface CartItem {
  price: number;
  quantity: Quantity;
}

interface Cart {
  items: CartItem[];
}

const aboveZero = (item: CartItem) => item.quantity.value > 0 && item.price > 0;
const belowInfinity = (item: CartItem) =>
  item.quantity.value < Infinity && item.price < Infinity;
const itemPrice = (item: CartItem) => item.quantity.value * item.price;
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
    { price: 1, quantity: { value: 2 } },
    { price: 10, quantity: { value: Infinity } },
    { price: 100, quantity: { value: 2 } },
  ],
};

console.log(totalCart(cart));
