'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('video'); // default active = video
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(6);
  const router = useRouter();

  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/review/get');
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Swal.fire("Error", "Failed to fetch reviews", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/api/v1/reviewManagement/?id=${id}`);
      Swal.fire("Deleted!", "Review has been deleted.", "success");
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      Swal.fire("Error", "Failed to delete review.", "error");
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/reviews-management/add-review?id=${id}`);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.reviewerName?.toLowerCase().includes(search.toLowerCase()) ||
      review.reviewText?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || review.reviewType === filterType;
    return matchesSearch && matchesType;
  });

  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const videoCount = reviews.filter((r) => r.reviewType === 'video').length;
  const textCount = reviews.filter((r) => r.reviewType === 'text').length;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">All Reviews</h2>



      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or text"
            className="border px-3 py-1 rounded-md text-sm w-64"
          />
          <FaSearch className="text-gray-500" />
        </div>
        {/* Hide dropdown since now toggle buttons handle filtering */}
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => { setFilterType('video'); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-md font-semibold text-sm ${filterType === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Video Reviews ({videoCount})
          </button>
          <button
            onClick={() => { setFilterType('text'); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-md font-semibold text-sm ${filterType === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Text Reviews ({textCount})
          </button>
        </div>
      </div>

      {/* Review Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <div key={review._id} className="border rounded-md p-3 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">⭐ {review.rating} by {review.reviewerName}</p>
                  <p className="text-xs text-gray-600">Created by: {review.createdBy}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit( review._id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {review.reviewType === 'text' && (
                <p className="mt-2 text-sm text-gray-700">"{review.reviewText}"</p>
              )}

              {review.reviewType === 'video' && review.videoUrl && (
                <div className="mt-2">
                  {review.videoUrl.includes("youtube.com") ? (
                    <iframe
                      className="w-full h-40 rounded"
                      src={`https://www.youtube.com/embed/${new URL(review.videoUrl).searchParams.get("v")}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video controls className="w-full h-40 rounded">
                      <source src={review.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 col-span-3">No reviews found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
