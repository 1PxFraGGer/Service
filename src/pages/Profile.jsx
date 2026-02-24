import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    image: "",
  });

  const [editing, setEditing] = useState(false);

  // Load saved profile data
  useEffect(() => {
    if (!user) return;

    const key = `profile_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key));

    if (stored) {
      setFormData(stored);
    } else {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  // Save profile
  const handleSave = () => {
    const key = `profile_${user.email}`;
    localStorage.setItem(key, JSON.stringify(formData));
    setEditing(false);
    alert("Profile Updated Successfully!");
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            👤 Profile Details
          </h2>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          )}
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              formData.image ||
              "https://via.placeholder.com/120"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-3"
            />
          )}
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-sm text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full border p-3 rounded-lg mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mt-1"
              rows="3"
            />
          </div>

        </div>
      </div>
    </div>
  );
}