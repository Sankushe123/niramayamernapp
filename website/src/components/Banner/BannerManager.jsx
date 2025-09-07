"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

// Dynamically import Cloudinary upload widget (no SSR)
const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

// Backend API base
const API_URL = "http://localhost:5000/api/banner";

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({
    bannerEventName: "",
    imageUrl: "",
    eventDate: "",
    status: "active",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all banners
  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${API_URL}/get`);
      setBanners(res.data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update Banner
  // Create or Update Banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.status === "active") {
        // Set all other banners inactive first
        await axios.put(`${API_URL}/set-all-inactive`);
      }

      if (editingId) {
        await axios.put(`${API_URL}/put/${editingId}`, form);
      } else {
        await axios.post(`${API_URL}/post`, form);
      }

      setForm({ bannerEventName: "", imageUrl: "", eventDate: "", status: "active" });
      setEditingId(null);
      fetchBanners();
    } catch (err) {
      console.error("Error saving banner:", err);
    }
  };


  // Edit Banner
  const handleEdit = (banner) => {
    setForm({
      bannerEventName: banner.bannerEventName,
      imageUrl: banner.imageUrl,
      eventDate: banner.eventDate?.split("T")[0] || "",
      status: banner.status,
    });
    setEditingId(banner._id);
  };

  // Delete Banner
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        fetchBanners();
      } catch (err) {
        console.error("Error deleting banner:", err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Edit Banner" : "Create Banner"}
      </h2>

      {/* FORM */}
      <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
        <input
          type="text"
          name="bannerEventName"
          placeholder="Event Name"
          value={form.bannerEventName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Cloudinary Upload */}
        <CldUploadWidget
          uploadPreset="userPropertyImg"
          onSuccess={(result) => {
            if (result?.info?.secure_url) {
              setForm((prev) => ({ ...prev, imageUrl: result.info.secure_url }));
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              className="bg-gray-600 text-white rounded-lg p-2 mt-2"
              onClick={() => open()}
            >
              Upload Image
            </button>
          )}
        </CldUploadWidget>

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="h-20 mt-2 rounded border"
          />
        )}

        <input
          type="date"
          name="eventDate"
          value={form.eventDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Banner" : "Add Banner"}
        </button>
      </form>

      {/* LIST */}
      <h2 className="text-xl font-bold mb-4">Banners List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Event Name</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Event Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner._id}>
              <td className="border p-2">{banner.bannerEventName}</td>
              <td className="border p-2">
                <img src={banner.imageUrl} alt="banner" className="h-12" />
              </td>
              <td className="border p-2">
                {banner.eventDate
                  ? new Date(banner.eventDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="border p-2">{banner.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(banner)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(banner._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {banners.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No banners found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
