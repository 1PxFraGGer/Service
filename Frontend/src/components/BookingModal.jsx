import { useState } from "react";

export default function BookingModal({ isOpen, onClose, service }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.phone || !formData.address || !formData.date) {
    setError("Please fill all fields");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        service_id: service.id,
        service_name: service.title,
        phone: formData.phone,
        date: formData.date,
        time: "10:00", // you can add time input later
      })
    });

    const data = await res.json();

    if (res.ok) {
      setError("");
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);

    } else {
      setError(data.message || "Booking failed");
    }

  } catch (error) {
    setError("Server error");
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Book {service?.title}
        </h2>

        {success ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center font-semibold">
            Booking Successful 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
