"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineImageNotSupported } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";

const BlogSection = () => {


  const router = useRouter();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs/get");
        const sortedBlogs = response.data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by date desc
          .slice(0, 3); // Take only the latest 3

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);


  const handleClick = () => {
    router.push("/mother-child-care/blogs");
  };
  return (
    <section className="py-12 bg-gray-50 md:px-10 lg:px-18 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Latest Health Tips</h2>

        <div className="md:hidden overflow-x-auto">
          <div className="flex space-x-4 px-1">
            {blogs.map((blog) => {
              const hasImage = Array.isArray(blog.imagesArray) && blog.imagesArray.length > 0 && blog.imagesArray[0];
              const imageUrl = hasImage
                ? blog.imagesArray[0]
                : "/Images/watermark-default.avif";
              const formattedDate = blog.createdAt;
              return (
                <div
                  key={blog._id}
                  className="min-w-[280px] max-w-[300px] bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
                >
                  <img
                    src={imageUrl}
                    alt={blog.blogTitle}
                    className="w-full h-[200px] object-cover rounded-lg mb-2"
                  />
                  <div className="p-5 py-2 flex flex-col flex-grow">
                    <p className="text-gray-500 text-sm font-semibold">{blog.blogCategory}</p>
                    <p className="text-[#DE409E] text-sm mt-1 font-medium">{blog.blogSubcategory}</p>
                    <h3 className="text-lg font-semibold mt-3">{blog.blogTitle}</h3>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <p className="text-gray-400 text-xs">{formattedDate}</p>
                      <button
                        onClick={() => handleReadMore(blog.slug)}
                        className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => {
            const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            const hasImage = Array.isArray(blog.imagesArray) && blog.imagesArray.length > 0 && blog.imagesArray[0];
            const imageUrl = hasImage
              ? blog.imagesArray[0]
              : "/Images/watermark-default.avif";

            return (
              <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
                <img
                  src={imageUrl}
                  alt={blog.blogTitle}
                  className="w-full h-[200px] object-cover rounded-lg mb-2"
                />


                <div className="p-5 py-2 flex flex-col flex-grow">
                  <p className="text-gray-500 text-sm font-semibold">{blog.blogCategory}</p>
                  <p className="text-[#DE409E] text-sm mt-1 font-medium">{blog.blogSubcategory}</p>
                  <h3 className="text-lg font-semibold mt-3">{blog.blogTitle}</h3>
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <p className="text-gray-400 text-xs">{formattedDate}</p>
                    <button
                      onClick={() => handleReadMore(blog.slug)}
                      className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Read More
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>



        <div className="flex justify-center mt-16 z-4 relative">
          <button
            onClick={handleClick}
            className="globalBtn px-4 py-1.5 cursor-pointer"
          >
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
