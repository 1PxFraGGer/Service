import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="container mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-600">
              ServiceHub
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Trusted home services at your doorstep. Verified professionals,
              transparent pricing, and seamless booking experience.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">

              <li>
                <Link
                  to="/about"
                  className="hover:text-black transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/investors"
                  className="hover:text-black transition"
                >
                  Investor Relations
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-black transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="hover:text-black transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="hover:text-black transition"
                >
                  Careers
                </Link>
              </li>

            </ul>
          </div>

          {/* For Customers */}
          <div>
            <h3 className="font-semibold mb-4">
              For Customers
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">

              <li>
                <Link
                  to="/reviews"
                  className="hover:text-black transition"
                >
                  Service Reviews
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="hover:text-black transition"
                >
                  Categories Near You
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-black transition"
                >
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>

          {/* Social + App */}
          <div>
            <h3 className="font-semibold mb-4">
              Social Links
            </h3>

            {/* Social Icons */}
            <div className="flex space-x-4 mb-6">
              {[
                { src: "/images/twitter.png", alt: "Twitter" },
                { src: "/images/facebook.png", alt: "Facebook" },
                { src: "/images/instagram.png", alt: "Instagram" },
                { src: "/images/linkedin.png", alt: "LinkedIn" },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:shadow-lg hover:scale-110 transition duration-300"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-5 h-5 object-contain"
                  />
                </a>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className="space-y-3">
              <img
                src="/images/appstore.webp"
                alt="Download on App Store"
                className="h-12 cursor-pointer hover:scale-105 transition duration-300"
              />
              <img
                src="/images/playstore.webp"
                alt="Get it on Google Play"
                className="h-12 cursor-pointer hover:scale-105 transition duration-300"
              />
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-12 pt-6 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} ServiceHub. All rights reserved.
        </div>

      </div>
    </footer>
  );
}