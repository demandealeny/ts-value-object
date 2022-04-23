interface Money {
  currency: "XPF" | "EUR" | "USD";
  value: number;
}

interface Quantity {
  value: number;
}

interface CartItem {
  price: Money;
  quantity: Quantity;
}

interface Cart {
  items: CartItem[];
}

const aboveZero = (item: CartItem) =>
  item.quantity.value > 0 && item.price.value > 0;
const belowInfinity = (item: CartItem) =>
  item.quantity.value < Infinity && item.price.value < Infinity;
const itemPrice = (item: CartItem) => item.quantity.value * item.price.value;
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
    { price: { currency: "EUR", value: 1 }, quantity: { value: 2 } },
    { price: { currency: "USD", value: 10 }, quantity: { value: Infinity } },
    { price: { currency: "XPF", value: 100 }, quantity: { value: 2 } },
  ],
};

console.log(totalCart(cart));
