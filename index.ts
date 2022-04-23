const currencies = ["XPF", "EUR", "USD"] as const;

interface Money {
  currency: typeof currencies[number];
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

function isQuantity(quantity: any): quantity is Quantity {
  return (
    quantity &&
    typeof quantity === "object" &&
    typeof quantity.value === "number" &&
    quantity.value > 0 &&
    quantity.value < 99
  );
}

function isMoney(price: any): price is Money {
  return (
    price &&
    typeof price === "object" &&
    typeof price.value === "number" &&
    typeof price.currency === "string" &&
    currencies.indexOf(price.currency) !== -1 &&
    price.value > 0 &&
    price.value < Infinity
  );
}

const byMoney = (item: CartItem) => isMoney(item.price);
const byQuantity = (item: CartItem) => isQuantity(item.quantity);
const itemPrice = (item: CartItem) => item.quantity.value * item.price.value;
const totalItemsPrice = (total: number, price: number) => total + price;

const totalCart = (cart: Cart) =>
  cart.items
    .filter(byMoney)
    .filter(byQuantity)
    .map(itemPrice)
    .reduce(totalItemsPrice, 0);

const cart: Cart = {
  items: [
    { price: { currency: "EUR", value: 1 }, quantity: { value: 2 } },
    { price: { currency: "USD", value: 10 }, quantity: { value: Infinity } },
    { price: { currency: "XPF", value: 100 }, quantity: { value: 2 } },
    { price: { currency: "XPF", value: -100 }, quantity: { value: 2 } },
    // Does not accept CAD as a currency
    // { price: { currency: "CAD", value: 100 }, quantity: { value: 2 } },
    { price: { currency: "XPF", value: 100 }, quantity: { value: 101 } },
  ],
};

console.log(totalCart(cart));
