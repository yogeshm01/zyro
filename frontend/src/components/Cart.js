import { useEffect, useState } from "react";
import { getCart, checkoutCart } from "../api/cart";

function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCart().then((data) => {
      setItems(data.items || []);
      setLoading(false);
    });
  }, []);

  const handleCheckout = async () => {
    const result = await checkoutCart();
    if (result.orderId) {
      setMessage("Order placed successfully");
      setItems([]);
    } else {
      setMessage(result.message || "Checkout failed");
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading cart...</p>;
  }

  return (
    <div className="bg-white border rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Cart</h2>

      {items.length === 0 ? (
        <p className="text-sm text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <ul className="mb-4 space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleCheckout}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Checkout
          </button>
        </>
      )}

      {message && (
        <p className="text-sm text-green-600 mt-3">{message}</p>
      )}
    </div>
  );
}

export default Cart;
