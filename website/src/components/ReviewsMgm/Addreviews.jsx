'use client';

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  FaStar,
  FaUser,
  FaAlignLeft,
  FaVideo,
} from "react-icons/fa";

const AddReview = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("id");  // Make sure route folder is [reviewid]

  const [formData, setFormData] = useState({
    reviewType: "text",
    videoUrl: "",
    reviewText: "",
    rating: "",
    reviewerName: "",
    createdBy: "",
  });

  useEffect(() => {
    const fetchReview = async () => {
      if (!reviewId) return;

      console.log('reviewId',reviewId);
      

      try {
        const res = await axios.get(`/api/review/get/${reviewId}`);

        const data = res.data;

        setFormData({
          reviewType: data.reviewType || "text",
          videoUrl: data.videoUrl || "",
          reviewText: data.reviewText || "",
          rating: data.rating || "",
          reviewerName: data.reviewerName || "",
          createdBy: data.createdBy || "",
        });
      } catch (err) {
        console.error("❌ Failed to fetch review for editing:", err);
        Swal.fire("Error", "Review not found (404)", "error");
      }
    };

    fetchReview();
  }, [reviewId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminRaw = sessionStorage.getItem("user");
      const admin = adminRaw ? JSON.parse(adminRaw) : null;
      const createdBy = admin ? `${admin.first_name} ${admin.last_name}` : "Unknown Admin";

      const dataToSend = { ...formData, createdBy };

      if (reviewId) {
        await axios.put(`/api/review/put/${reviewId}`, dataToSend);
        Swal.fire("Updated", "Review updated successfully!", "success");
      } else {
        await axios.post("/api/review/post", dataToSend);
        Swal.fire("Success", "Review added successfully!", "success");
      }

      setFormData({
        reviewType: "text",
        videoUrl: "",
        reviewText: "",
        rating: "",
        reviewerName: "",
        createdBy: "",
      });

      router.push("/admin/reviews-management/list-review");
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      Swal.fire("Error", "Submission failed", "error");
    }
  };

  const renderVideoPreview = () => {
    if (!formData.videoUrl) return null;

    const isYouTube = formData.videoUrl.includes("youtube.com") || formData.videoUrl.includes("youtu.be");
    const isDirectVideo = /\.(mp4|webm|ogg)$/i.test(formData.videoUrl);

    if (isYouTube) {
      const videoId = formData.videoUrl.includes("v=")
        ? formData.videoUrl.split("v=")[1]?.split("&")[0]
        : formData.videoUrl.split("/").pop();

      return (
        <iframe
          className="w-full h-40 mt-1 rounded-md"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Video Preview"
          allowFullScreen
        />
      );
    } else if (isDirectVideo) {
      return (
        <video controls className="w-full h-40 mt-1 rounded-md">
          <source src={formData.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <p className="text-xs text-red-500 mt-1">Unsupported video format or URL.</p>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white shadow p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
        {reviewId ? "Update Review" : "Add Review"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2 text-sm">
        <SelectField
          label="Review Type"
          name="reviewType"
          value={formData.reviewType}
          onChange={handleChange}
        />

        {formData.reviewType === "video" && (
          <>
            <InputField
              label="Video URL"
              name="videoUrl"
              icon={<FaVideo />}
              value={formData.videoUrl}
              onChange={handleChange}
            />
            {renderVideoPreview()}
          </>
        )}

        {formData.reviewType === "text" && (
          <TextareaField
            label="Review Text"
            name="reviewText"
            icon={<FaAlignLeft />}
            value={formData.reviewText}
            onChange={handleChange}
          />
        )}

        <div className="flex gap-2">
          <InputField
            label="Rating"
            name="rating"
            icon={<FaStar />}
            type="number"
            value={formData.rating}
            onChange={handleChange}
            min={1}
            max={5}
          />

          <InputField
            label="Reviewer"
            name="reviewerName"
            icon={<FaUser />}
            value={formData.reviewerName}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full py-1.5 mt-1 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition text-sm"
        >
          {reviewId ? "Update Review" : "Submit"}
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, icon, type = "text", min, max }) => (
  <div className="flex flex-col text-xs w-full">
    <label className="text-gray-600 mb-1">{label}</label>
    <div className="flex items-center border border-gray-300 rounded-md px-2 py-2">
      <span className="text-gray-500 mr-2">{icon}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full outline-none text-sm"
        placeholder={`Enter ${label}`}
      />
    </div>
  </div>
);


const TextareaField = ({ label, name, value, onChange, icon }) => (
  <div className="flex flex-col text-xs">
    <label className="text-gray-600 mb-1">{label}</label>
    <div className="flex border border-gray-300 rounded-md px-2 py-1">
      <span className="text-gray-500 mr-2 mt-1">{icon}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full outline-none text-sm resize-none"
        rows="2"
        placeholder={`Write ${label}`}
      />
    </div>
  </div>
);

const SelectField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col text-xs">
    <label className="text-gray-600 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
    >
      <option value="text">Text</option>
      <option value="video">Video</option>
    </select>
  </div>
);

export default AddReview;
