import React from "react";
import { useRouter } from "next/navigation";
import slugify from "slugify";

const BlogCard = ({ blog }) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/admin/blog-management/view-blog?id=${blog._id}`);
  };

  // Determine the image URL (fallback to watermark if not available)
  const hasImage =
    Array.isArray(blog.imagesArray) &&
    blog.imagesArray.length > 0 &&
    blog.imagesArray[0] &&
    blog.imagesArray[0].trim() !== "";

  const imageUrl = hasImage
    ? blog.imagesArray[0]
    : "/Images/watermark-default.avif"; // Replace with your actual fallback path

  return (
    <div className="rounded-xl shadow-md p-2 w-full max-w-xs flex flex-col justify-between">
      
      <div className="w-full h-40 rounded-lg mb-4 overflow-hidden">
        <img
          src={imageUrl}
          alt={blog.blogTitle}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Title */}
      <h3 className="text-lg font-semibold text-gray-800">{blog.blogTitle}</h3>

      {/* Read More Button */}
      <div className="flex justify-end">
        <button
          onClick={handleReadMore}
          className="mt-4 px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
