import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import ServiceSkeleton from "../components/ServiceSkeleton";
import { useLocation } from "../context/LocationContext";

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

export default function Services() {
  const { city } = useLocation();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const servicesPerPage = 3;
  const categories = ["All", "Cleaning", "AC", "Plumbing", "Electrical"];

  // Fake loading effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [search, selectedCategory, sortBy, maxPrice]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortBy, maxPrice]);

  // Filtering
  let filteredServices = servicesData.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      service.category === selectedCategory;

    const matchesCity = service.city === city;
    const matchesPrice = service.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesCity && matchesPrice;
  });

  // Sorting
  if (sortBy === "priceLow") {
    filteredServices.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "priceHigh") {
    filteredServices.sort((a, b) => b.price - a.price);
  }
  if (sortBy === "rating") {
    filteredServices.sort((a, b) => b.rating - a.rating);
  }

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div className="container mx-auto px-6 py-16">

      <h2 className="text-3xl font-bold text-center mb-2">
        Services in {city}
      </h2>

      <p className="text-center text-gray-500 mb-10">
        Showing available services in your selected location
      </p>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Category Filters */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full border transition ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort & Price */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded-xl shadow-sm"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>

        <div className="flex flex-col items-center">
          <label className="text-sm font-medium">
            Max Price: ₹{maxPrice}
          </label>
          <input
            type="range"
            min="500"
            max="2000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-56 accent-blue-600"
          />
        </div>

      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <ServiceSkeleton key={i} />
          ))
        ) : currentServices.length > 0 ? (
          currentServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No services found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div className="flex justify-center mt-14 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-xl border transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}