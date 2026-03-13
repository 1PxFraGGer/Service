import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "../context/LocationContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { city, setCity } = useLocation();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const profileRef = useRef();

  const cities = ["Jaipur", "Delhi", "Mumbai", "Bangalore"];

  /* ---------------- Wishlist Counter ---------------- */
  useEffect(() => {
    const updateWishlist = () => {
      if (!user) {
        setWishlistCount(0);
        return;
      }

      const key = `wishlist_${user.email}`;
      const stored = JSON.parse(localStorage.getItem(key)) || [];
      setWishlistCount(stored.length);
    };

    updateWishlist();
    window.addEventListener("wishlistUpdated", updateWishlist);

    return () =>
      window.removeEventListener("wishlistUpdated", updateWishlist);
  }, [user]);

  /* ---------------- Cart Counter ---------------- */
  useEffect(() => {
    const updateCart = () => {
      if (!user) {
        setCartCount(0);
        return;
      }

      const key = `cart_${user.email}`;
      const stored = JSON.parse(localStorage.getItem(key)) || [];

      const totalItems = stored.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(totalItems);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);

    return () =>
      window.removeEventListener("cartUpdated", updateCart);
  }, [user]);

  /* ---------------- Close Profile Dropdown ---------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Logout Handler ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove jwt
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold text-blue-600">
          ServiceHub
        </Link>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className="hidden md:flex items-center space-x-6">

          {/* City selector */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border px-3 py-1 rounded-lg"
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>

          {/* Cart */}
          {user && (
            <Link to="/cart" className="relative text-xl">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Profile Dropdown */}
          {user && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
              >
                {(user.name || "U").charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border py-2 z-50">

                  {/* User Info */}
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm text-gray-500">
                      Signed in as
                    </p>
                    <p className="font-semibold">
                      {user.name}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile Details
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex justify-between px-4 py-2 hover:bg-gray-100"
                  >
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  {/* ⭐ BOOKINGS PAGE */}
                  <Link
                    to="/bookings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-gray-50">

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <Link to="/" className="block">Home</Link>
          <Link to="/services" className="block">Services</Link>

          {user && (
            <>
              <Link to="/cart" className="block">
                Cart ({cartCount})
              </Link>

              <Link to="/wishlist" className="block">
                Wishlist ({wishlistCount})
              </Link>

              {/* ⭐ BOOKINGS */}
              <Link to="/bookings" className="block">
                My Bookings
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 block"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link to="/login" className="block">Login</Link>
              <Link to="/register" className="block">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}