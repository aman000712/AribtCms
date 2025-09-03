import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Star } from "lucide-react";

const TestimonialView = () => {
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      const storedTestimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
      const found = storedTestimonials.find((t) => t.id === parseInt(id));
      if (found) {
        setTestimonial(found);
      } else {
        setError("Testimonial not found");
      }
    } catch (err) {
      setError("Failed to load testimonial details");
      console.error("Error loading testimonial:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-green-800 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonial details...</p>
        </div>
      </div>
    );
  }

  if (error || !testimonial) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{error || "Testimonial not found"}</h2>
          <p className="text-gray-600 mb-6">The testimonial you're looking for doesn't exist or may have been removed.</p>
          <Link
            to="/testimonials"
            className="inline-flex items-center px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/testimonials"
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Testimonials
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 flex flex-col md:flex-row gap-6">
          
          <div className="flex-shrink-0">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-64 h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 break-words">{testimonial.name}</h1>
              {testimonial.designation && (
                <div className="flex items-center text-gray-600 mt-2">
                  <User size={18} className="mr-2 text-gray-400" />
                  <span>{testimonial.designation}</span>
                </div>
              )}
            </div>

            {testimonial.rating && (
              <div className="flex items-center text-gray-600 mb-4">
                <Star size={18} className="mr-2 text-yellow-400" />
                <span>{testimonial.rating}</span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Message</h3>
              <p className="text-gray-700 leading-relaxed break-words whitespace-pre-line">
                {testimonial.message || "No message provided."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TestimonialView;
