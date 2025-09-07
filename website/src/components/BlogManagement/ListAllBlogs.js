'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./../widgets/Common/BlogCard";

const ListAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs/get");
        console.log(response);
        
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAllBlogs;

