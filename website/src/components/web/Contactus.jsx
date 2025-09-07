'use client';

import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import axios from 'axios';
export default function Contactus() {
  let contactNo = process.env.NEXT_EMERGENCY_CONTACT_NO || "123-456-7890";
  let emailContact = process.env.ADMIN_EMAIL || "123-456-7890";
  let clinicAddress = process.env.clinic_Address;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await axios.post('/api/user/contact-us', formData);

      console.log('res',res);
      

      if (res.status === 200) {
        setSuccessMsg("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMsg("");
        }, 5000);
      } else {
        setErrorMsg("Failed to send message.");
      }

    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-10 py-16">
      <h2 className="text-3xl font-bold text-center">Contact Us</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                required
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
            {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 globalBtn transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-bold ">Niramaya Mother and Child Care Clinic Location</h2>

          <div className="bg-gray-100 p-6 shadow-md rounded-lg">
            <iframe
              className="w-full h-80 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6005.202092791748!2d73.74326700000002!3d18.649454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb00667b0701%3A0xbe4dbd51973c52e!2sNiramaya%20Mother%20and%20Child%20Care%20Clinic!5e1!3m2!1sen!2sin!4v1740910351046!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600" />
                <p>{clinicAddress}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-600" />
                <p>{contactNo}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600" />
                <p>{emailContact}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-blue-600" />
                <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
