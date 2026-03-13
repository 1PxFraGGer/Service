import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import BackgroundBlobs from "../components/BackgroundBlobs";

export default function Home() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="hero-section">

        {/* Glow Effects */}
        <div className="glow-blue top-20 left-10" />
        <div className="glow-purple bottom-20 right-10" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title gradient-text"
          >
            Book Trusted <br />
            Home Services Instantly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-subtitle"
          >
            Verified professionals. Transparent pricing. Instant booking.
            Experience premium service at your doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Link to="/services" className="btn-primary">
              Explore Services
            </Link>

            <Link to="/about" className="btn-outline">
              Learn More
            </Link>
          </motion.div>

          {/* Floating Service Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { title: "AC Repair", price: "₹599" },
              { title: "Deep Cleaning", price: "₹1499" },
              { title: "Plumbing", price: "₹399" },
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <p className="font-semibold">{item.title}</p>
                <p className="text-indigo-600 font-bold mt-2">
                  {item.price}
                </p>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">Featured Services</h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Home Cleaning", image: "/images/homecleaning1.jpg" },
              { title: "AC Repair", image: "/images/ac1.jpg" },
              { title: "Plumbing", image: "/images/plumbing1.jpg" },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="premium-card overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-56 w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">
                    {service.title}
                  </h3>

                  <Link to="/services" className="btn-soft">
                    Book Now →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="section bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container-custom grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-center">
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "500+", label: "Verified Professionals" },
            { number: "50+", label: "Services Offered" },
            { number: "4.8⭐", label: "Average Rating" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="stat-card"
            >
              <h3 className="stat-number">{item.number}</h3>
              <p className="text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">
            What Our Customers Say
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Rahul Sharma",
                review:
                  "Amazing service! Booking was simple and the professional was very skilled.",
              },
              {
                name: "Priya Verma",
                review:
                  "Quick response and great experience. Highly recommend!",
              },
              {
                name: "Amit Singh",
                review:
                  "Very professional team and affordable pricing.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="testimonial-card"
              >
                <p className="text-gray-700 mb-6 italic">
                  "{item.review}"
                </p>
                <h4 className="font-semibold text-indigo-600">
                  - {item.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="section-title">How It Works</h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "Choose Service", desc: "Select the service you need." },
              { step: "2", title: "Book Schedule", desc: "Pick date & time that suits you." },
              { step: "3", title: "Expert Visit", desc: "Verified professional visits your home." },
              { step: "4", title: "Relax & Enjoy", desc: "Sit back and enjoy quality service." },
            ].map((item, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{item.step}</div>
                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* SERVICE CATEGORIES */}
{/* SERVICE CATEGORIES */}
<section className="py-24 bg-white">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-16">
      Explore Categories
    </h2>

    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {[
        { name: "Full Home Cleaning", image: "/images/homecleaning1.jpg" },
        { name: "AC Services", image: "/images/ac1.jpg" },
        { name: "Bathroom Plumbing", image: "/images/plumbing1.jpg" },
        { name: "Electrical Wiring Repair", image: "/images/electric1.jpg" },
        { name: "Kitchen Cleaning", image: "/images/painting.jpg" },
        { name: "Sofa Cleaning", image: "/images/pest.jpg" },
      ].map((category, index) => (
        <Link
          key={index}
          to="/services"
          className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
        >
          {/* Image */}
          <img
            src={category.image}
            alt={category.name}
            className="h-40 w-full object-cover group-hover:scale-110 transition duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white font-semibold text-lg">
              {category.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
{/* WHY CHOOSE US */}
<section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-16">
      Why Choose ServiceHub?
    </h2>

    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
      {[
        "Verified Professionals",
        "30-Day Service Warranty",
        "Transparent Pricing",
        "24/7 Customer Support",
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
        >
          <p className="font-semibold text-lg">{item}</p>
        </div>
      ))}
    </div>
  </div>
</section>
 {/* FAQ */}
      <section className="section bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="section-title">
            Frequently Asked Questions
          </h2>
          <FAQSection />
        </div>
      </section>

      {/* COMMENTS */}
      <section className="section bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="section-title">
            💬 Customer Comments
          </h2>
          <CommentSection />
        </div>
      </section>

    </div>
  );
}
function FAQSection() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "How do I book a service?",
      answer: "Simply select your service, choose date & time, and confirm booking.",
    },
    {
      question: "Are professionals verified?",
      answer: "Yes, all professionals undergo background verification.",
    },
    {
      question: "Is there a service warranty?",
      answer: "Yes, we provide up to 30-day service warranty.",
    },
    {
      question: "Can I reschedule my booking?",
      answer: "Yes, you can reschedule from your bookings page.",
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border rounded-xl p-4"
        >
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="w-full text-left font-semibold"
          >
            {faq.question}
          </button>

          {open === index && (
            <p className="mt-3 text-gray-600">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
/* Comment Component */
function CommentSection() {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    const newComment = {
      id: Date.now(),
      name: formData.name,
      message: formData.message,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newComment, ...comments];
    localStorage.setItem("comments", JSON.stringify(updated));
    setComments(updated);
    setFormData({ name: "", message: "" });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md mb-12 space-y-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          placeholder="Write your comment..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full border p-3 rounded-xl h-28 resize-none"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-6 rounded-2xl shadow-sm border"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold text-blue-600">
                  {comment.name}
                </h4>
                <span className="text-sm text-gray-400">
                  {comment.date}
                </span>
              </div>
              <p className="text-gray-600">{comment.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No comments yet. Be the first!
          </p>
        )}
      </div>
    </div>
  );
}