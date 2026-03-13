import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    id: "1",
    title: "Full Home Cleaning",
    images: [
      "/images/cleaning1.jpg",
      "/images/cleaning2.jpg",
      "/images/cleaning3.jpg",
      "/images/cleaning4.jpg",
    ],
    price: 1499,
    rating: 4.8,
    description:
      "Complete deep cleaning for your home including bedrooms, kitchen, bathrooms and living area.",
  },
  {
    id: "2",
    title: "AC Installation",
    images: [
      "/images/ac1.jpg",
      "/images/ac2.jpg",
      "/images/ac3.jpg",
      "/images/ac4.jpg",
    ],
    price: 999,
    rating: 4.6,
    description:
      "Professional AC installation with warranty and expert technicians.",
  },
  {
    id: "3",
    title: "Bathroom Plumbing",
    images: [
      "/images/plumbing1.jpg",
      "/images/plumbing2.jpg",
      "/images/plumbing3.jpg",
      "/images/plumbing4.jpg",
    ],
    price: 599,
    rating: 4.7,
    description:
      "Fix leaks, taps, pipes and bathroom plumbing issues quickly and safely.",
  },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  const [openFAQ, setOpenFAQ] = useState(null);

  const [formData, setFormData] = useState({
    service: service?.title || "",
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(
    service?.images?.[0]
  );

  if (!service) {
    return <div className="text-center py-20">Service Not Found</div>;
  }

  const similarServices = services.filter((s) => s.id !== id);

const handleSubmit = async (e) => {
  e.preventDefault();

  const phoneRegex = /^[0-9]+$/;

  if (!formData.name || !formData.phone || !formData.date || !formData.time) {
    setError("Please fill all required fields");
    return;
  }

  if (!phoneRegex.test(formData.phone)) {
    setError("Phone number must contain only digits");
    return;
  }

  if (formData.phone.length !== 10) {
    setError("Phone number must be exactly 10 digits");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        service_id: service.id,
        service_name: service.title,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Booking submitted successfully!");
      setError("");
    } else {
      setError(data.message || "Booking failed");
    }

  } catch (error) {
    setError("Server error");
  }
};

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">

        <Link
          to="/services"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← Back to Services
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-12">

            {/* IMAGE GALLERY */}
            <div className="flex gap-6">

              <div className="flex flex-col gap-4">
                {service.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="thumbnail"
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                      selectedImage === img
                        ? "border-blue-600"
                        : "border-gray-200"
                    } hover:border-blue-400 transition`}
                  />
                ))}
              </div>

              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1"
              >
                <img
                  src={selectedImage}
                  alt={service.title}
                  className="w-full rounded-2xl shadow-xl hover:scale-105 transition duration-300"
                />
              </motion.div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-4">
                About This Service
              </h2>
              <p className="text-gray-600">{service.description}</p>
            </div>

            {/* Rating */}
            <div className="bg-white p-8 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-6">
                Customer Rating
              </h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-yellow-500 text-3xl"
              >
                {"⭐".repeat(Math.round(service.rating))}
              </motion.div>

              <p className="mt-4 text-gray-600">
                Rated {service.rating} by 1,200+ customers
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white p-8 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-6">FAQs</h2>

              {[
                {
                  question: "How long does the service take?",
                  answer:
                    "Most services are completed within 2–4 hours depending on size.",
                },
                {
                  question: "Is there a warranty?",
                  answer:
                    "Yes, all services include a 30-day service warranty.",
                },
                {
                  question: "Can I reschedule?",
                  answer:
                    "Yes, you can reschedule up to 12 hours before appointment.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b py-4">
                  <button
                    onClick={() =>
                      setOpenFAQ(openFAQ === index ? null : index)
                    }
                    className="w-full text-left font-semibold"
                  >
                    {faq.question}
                  </button>

                  {openFAQ === index && (
                    <p className="mt-2 text-gray-600">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Similar Services */}
            <div className="bg-white p-8 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-6">
                Similar Services
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {similarServices.map((item) => (
                  <Link
                    key={item.id}
                    to={`/services/${item.id}`}
                    className="border rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 group"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-600 font-bold">
                        ₹{item.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* BOOKING FORM */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-xl sticky top-24">

              <h1 className="text-3xl font-bold mb-4">
                {service.title}
              </h1>

              <p className="text-yellow-500 mb-2">
                ⭐ {service.rating}
              </p>

              <p className="text-3xl font-bold text-blue-600 mb-6">
                ₹{service.price}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Service Selection */}
                <select
                  className="w-full border p-3 rounded-xl"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full border p-3 rounded-xl"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full border p-3 rounded-xl"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <input
                  type="date"
                  required
                  className="w-full border p-3 rounded-xl"
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />

                <input
                  type="time"
                  required
                  className="w-full border p-3 rounded-xl"
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:scale-105 transition"
                >
                  Confirm Booking
                </button>

                {message && (
                  <p className="text-green-600 text-center font-semibold">
                    {message}
                  </p>
                )}

                {error && (
                  <p className="text-red-500 text-center font-semibold">
                    {error}
                  </p>
                )}

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}