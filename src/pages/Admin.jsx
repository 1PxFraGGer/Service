import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Please login
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      

      {/* Main Content */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Admin Panel
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Total Bookings</h3>
            <p className="text-3xl font-bold">
              {bookings.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
            Recent Bookings
          </h2>

          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <p className="font-semibold">
                      {booking.service}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.name} | {booking.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}