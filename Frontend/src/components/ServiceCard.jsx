import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function ServiceCard({
  id,
  title,
  images,
  price,
  rating,
  badge,
}) {
  const { user } = useAuth();

  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  /* ---------------- WISHLIST ---------------- */

  useEffect(() => {
    if (!user) {
      setWishlisted(false);
      return;
    }

    const key = `wishlist_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    setWishlisted(stored.includes(id));
  }, [id, user]);

  const toggleWishlist = () => {
    if (!user) {
      alert("Please login to use wishlist");
      return;
    }

    const key = `wishlist_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];

    let updated;
    if (stored.includes(id)) {
      updated = stored.filter((item) => item !== id);
    } else {
      updated = [...stored, id];
    }

    localStorage.setItem(key, JSON.stringify(updated));
    setWishlisted(!wishlisted);

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  /* ---------------- CART ---------------- */

  const addToCart = () => {
    if (!user) {
      alert("Please login to add to cart");
      return;
    }

    const key = `cart_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];

    const existing = stored.find((item) => item.id === id);

    let updated;

    if (existing) {
      updated = stored.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [...stored, { id, quantity: 1 }];
    }

    localStorage.setItem(key, JSON.stringify(updated));

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1000);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group">

      {/* ❤️ Animated Wishlist */}
      <motion.button
        whileTap={{ scale: 1.4 }}
        animate={wishlisted ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 text-2xl"
      >
        {wishlisted ? "❤️" : "🤍"}
      </motion.button>

      {/* Badge */}
      {badge && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
          {badge}
        </span>
      )}

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={images?.[0]}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-3 line-clamp-1">
          {title}
        </h3>

        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-600 font-bold text-lg">
            ₹{price}
          </span>

          <span className="text-yellow-500 font-semibold">
            ⭐ {rating}
          </span>
        </div>

        {/* View Details */}
        <Link
          to={`/services/${id}`}
          className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl hover:scale-105 active:scale-95 transition"
        >
          View Details
        </Link>

        {/* Add to Cart */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={addToCart}
          className="mt-3 w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-xl transition font-medium"
        >
          {addedToCart ? "✔ Added!" : "Add to Cart 🛒"}
        </motion.button>
      </div>
    </div>
  );
}