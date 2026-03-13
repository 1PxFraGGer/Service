import { useEffect, useState } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "confirmed") return "bg-blue-100 text-blue-700";
    if (status === "completed") return "bg-green-100 text-green-700";
    if (status === "cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="container mx-auto px-6 py-16">

      <h2 className="text-3xl font-bold mb-10">
        My Bookings
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between"
            >

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {booking.service_name}
                </h3>

                <p className="text-gray-500">
                  📅 {booking.booking_date}
                </p>

                <p className="text-gray-500">
                  ⏰ {booking.booking_time}
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}