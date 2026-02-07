"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/widgets/Common/Navbar";
import Breadcrumbs from "@/components/widgets/Common/Breadcrumbs";
import { useRouter } from "next/navigation";
import axios from "axios";

const BlogsList = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch blogs from API on mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("/api/blogs/get");
                // Sort by date descending
                const sortedBlogs = response.data.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                setBlogs(sortedBlogs);
                setFilteredBlogs(sortedBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    // Handle search input change
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (!term.trim()) {
            setFilteredBlogs(blogs);
            return;
        }

        const filtered = blogs.filter((blog) =>
            blog.blogTitle.toLowerCase().includes(term.toLowerCase()) ||
            blog.blogCategory.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredBlogs(filtered);
    };

    // Handle click on "Read More"
    const handleReadMore = (slug) => {
        router.push(`/mother-child-care/blogs/detailed-blog?slug=${slug}`);
    };

    return (
        <div className="min-h-screen">

            <div className="mb-4 mt-3">
                <Navbar />
            </div>


            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-16 pt-4">
                <div className="w-full sm:w-auto">
                    <Breadcrumbs />
                </div>
                <div className="w-full sm:w-72">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search blogs by title or category..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
            </div>

            {/* Blog Cards */}
            <div className="bg-slate-50 w-full px-6 sm:px-20 py-10">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filteredBlogs.length === 0 ? (
                        <p className="text-center col-span-full text-gray-500">No blogs found.</p>
                    ) : (
                        filteredBlogs.map((blog) => {
                            const formattedDate = blog?.createdAt
                                ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
                                : "";



                            const imageUrl =
                                Array.isArray(blog.imagesArray) &&
                                    blog.imagesArray.length > 0 &&
                                    blog.imagesArray[0]
                                    ? blog.imagesArray[0]
                                    : "/Images/watermark-default.avif";

                            return (
                                <div
                                    key={blog._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                                >

                                    <img
                                        src={imageUrl}
                                        alt={blog.blogTitle}
                                        className="w-full h-48 object-cover"
                                    />

                                    <div className="p-4 flex flex-col justify-between flex-grow">
                                        <div>
                                            <p className="text-gray-500 text-xs font-semibold">
                                                {blog.blogCategory}
                                            </p>
                                            <p className="text-[#DE409E] text-sm mt-1 font-medium">
                                                {blog.blogSubcategory}
                                            </p>
                                            <h3 className="text-lg font-bold mt-1">{blog.blogTitle}</h3>
                                            <p
                                                className="text-gray-600 text-sm mt-3"
                                                dangerouslySetInnerHTML={{
                                                    __html: blog.blogContent
                                                        ? blog.blogContent.substring(0, 100) + "..."
                                                        : "",
                                                }}
                                            ></p>

                                        </div>

                                        <div className="flex justify-between items-center mt-4">
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
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogsList;
