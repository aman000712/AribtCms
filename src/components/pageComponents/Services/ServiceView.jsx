import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, ArrowLeft, Star, Calendar, User, MapPin } from "lucide-react";

const ServiceView = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      const services = JSON.parse(localStorage.getItem("services")) || [];
      const found = services.find((s) => s.id === parseInt(id));
      
      if (found) {
        setService(found);
      } else {
        setError("Service not found");
      }
    } catch (err) {
      setError("Failed to load service details");
      console.error("Error loading service:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-green-800 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{error || "Service not found"}</h2>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or may have been removed.</p>
          <Link
            to="/services"
            className="inline-flex items-center px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/services"
            className="inline-flex py-12 items-center text-green-700 hover:text-green-800 font-medium transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Services
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 p-6 flex flex-col">
              <div className="w-full aspect-[4/3] rounded-xl bg-gray-100 overflow-hidden shadow-md flex items-center justify-center">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' /%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <div className="text-gray-400 p-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="mt-6 space-y-4">
                {service.provider && (
                  <div className="flex items-center text-gray-600">
                    <User size={18} className="mr-3 text-gray-400" />
                    <span>{service.provider}</span>
                  </div>
                )}
                
                {service.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-3 text-gray-400" />
                    <span>{service.location}</span>
                  </div>
                )}
                
                {service.rating && (
                  <div className="flex items-center text-gray-600">
                    <Star size={18} className="mr-3 text-yellow-400 fill-current" />
                    <span>{service.rating} (24 reviews)</span>
                  </div>
                )}
                
                {service.availability && (
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-3 text-gray-400" />
                    <span>{service.availability}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-3/5 p-6 md:border-l border-gray-100">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 break-words">
                {service.title}
              </h1>

              

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed break-words whitespace-pre-line">
                  {service.description || "No description available."}
                </p>
              </div>

              {service.features && service.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Features & Benefits</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={18} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceView;