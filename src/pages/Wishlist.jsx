import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { useAuth } from "../context/AuthContext";

const servicesData = [
  {
    id: 1,
    title: "Full Home Cleaning",
    category: "Cleaning",
    city: "Jaipur",
    images: ["/images/cleaning1.jpg"],
    price: 1499,
    rating: 4.8,
    badge: "Popular",
  },
  {
    id: 2,
    title: "Bathroom Plumbing",
    category: "Plumbing",
    city: "Jaipur",
    images: ["/images/plumbing1.jpg"],
    price: 599,
    rating: 4.7,
    badge: "Recommended",
  },
  {
    id: 3,
    title: "Kitchen Deep Cleaning",
    category: "Cleaning",
    city: "Jaipur",
    images: ["/images/cleaning1.jpg"],
    price: 899,
    rating: 4.6,
  },
  {
    id: 4,
    title: "Sofa Cleaning",
    category: "Cleaning",
    city: "Jaipur",
    images: ["/images/cleaning1.jpg"],
    price: 799,
    rating: 4.5,
  },
  {
    id: 5,
    title: "Electrical Wiring Repair",
    category: "Electrical",
    city: "Jaipur",
    images: ["/images/electric1.jpg"],
    price: 699,
    rating: 4.4,
  },
  {
    id: 6,
    title: "AC Service & Gas Refill",
    category: "AC",
    city: "Jaipur",
    images: ["/images/ac1.jpg"],
    price: 1099,
    rating: 4.7,
  },
];

export default function Wishlist() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (!user) {
      setWishlistItems([]);
      return;
    }

    const key = `wishlist_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];

    const filtered = servicesData.filter((service) =>
      stored.includes(service.id)
    );

    setWishlistItems(filtered);
  }, [user]);

  return (
    <div className="container mx-auto px-6 py-16">

      <h2 className="text-3xl font-bold text-center mb-12">
        ❤️ Your Wishlist
      </h2>

      {!user ? (
        <p className="text-center text-gray-500">
          Please login to view your wishlist.
        </p>
      ) : wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Your wishlist is empty.
        </p>
      )}

    </div>
  );
}