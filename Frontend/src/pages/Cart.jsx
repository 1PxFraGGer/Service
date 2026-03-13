import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const servicesData = [
  {
    id: 1,
    title: "Full Home Cleaning",
    images: ["/images/cleaning1.jpg"],
    price: 1499,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Bathroom Plumbing",
    images: ["/images/plumbing1.jpg"],
    price: 599,
    rating: 4.7,
  },
  {
    id: 3,
    title: "Kitchen Deep Cleaning",
    images: ["/images/cleaning1.jpg"],
    price: 899,
    rating: 4.6,
  },
];

export default function Cart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  /* -------- Load Cart -------- */
  useEffect(() => {
    if (!user) return;

    const key = `cart_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];

    const detailed = stored
      .map((item) => {
        const service = servicesData.find(
          (s) => s.id === item.id
        );
        if (!service) return null;

        return {
          ...service,
          quantity: item.quantity,
        };
      })
      .filter(Boolean);

    setCartItems(detailed);
  }, [user]);

  /* -------- Remove -------- */
  const removeFromCart = (id) => {
    const key = `cart_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];

    const updated = stored.filter((item) => item.id !== id);

    localStorage.setItem(key, JSON.stringify(updated));
    setCartItems(cartItems.filter((item) => item.id !== id));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  /* -------- Quantity Update -------- */
  const updateQuantity = (id, type) => {
    const key = `cart_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];

    const updated = stored.map((item) => {
      if (item.id === id) {
        if (type === "inc") {
          return { ...item, quantity: item.quantity + 1 };
        }
        if (type === "dec" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    localStorage.setItem(key, JSON.stringify(updated));

    const refreshed = updated.map((item) => {
      const service = servicesData.find(
        (s) => s.id === item.id
      );
      return { ...service, quantity: item.quantity };
    });

    setCartItems(refreshed);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10">
        🛒 Your Cart
      </h2>

      {cartItems.length > 0 ? (
        <>
          <div className="space-y-6">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow"
              >

                {/* Left: Image + Info */}
                <div className="flex items-center gap-6 w-full md:w-auto">

                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-500">
                      ₹{item.price} per service
                    </p>

                    <p className="mt-2 font-medium text-blue-600">
                      Subtotal: ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Right: Quantity + Remove */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">

                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, "dec")
                      }
                      className="px-3 py-1 bg-gray-100"
                    >
                      -
                    </button>

                    <span className="px-4">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, "inc")
                      }
                      className="px-3 py-1 bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* Total Section */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow text-right">
            <h3 className="text-xl font-bold">
              Total: ₹{total}
            </h3>

            <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:scale-105 transition">
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}