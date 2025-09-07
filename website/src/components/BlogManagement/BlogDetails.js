"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import slugify from "slugify";
import { useSearchParams } from "next/navigation";
const BlogDetails = () => {
  const router = useRouter();
  const params = useParams();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [blog, setBlog] = useState(null);


  console.log('id', id, params);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/blogs/get/${id}`)
        .then((response) => {
          console.log('response', response);
          setBlog(response.data);
        })
        .catch((error) => {
          console.error("Error fetching blog:", error);
        });
    }
  }, [id]);


  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/blogs/delete/${id}`);
          Swal.fire("Deleted!", "The blog has been deleted.", "success");
          router.push(`/admin/blog-management/list-blogs`); // Redirect to the blog list
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the blog.", "error");
          console.error("Error deleting blog:", error);
        }
      }
    });
  };

  const handleEdit = (blogid) => {
    router.push(`/admin/blog-management/add-blog?id=${blogid}`)
  }
  
  if (!blog) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-5xl mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            className="px-3 py-2 rounded-sm border hover:bg-gray-200 hover:border-gray-400"
            onClick={() => { handleEdit(blog._id) }}
          >
            <TbEdit />
          </button>
          <button
            className="px-3 py-2 rounded-sm border hover:bg-gray-200 hover:border-gray-400"
            onClick={handleDelete}
          >
            <MdDeleteOutline />
          </button>
        </div>

        {/* Blog Title */}
        <h1 className="text-3xl font-bold mb-4">{blog.blogTitle}</h1>

        {/* Blog Image (if available) */}
        {Array.isArray(blog.imagesArray) && blog.imagesArray.length > 0 && blog.imagesArray[0] && (
          <img
            src={blog.imagesArray[0]}
            alt={blog.blogTitle}
            className="w-full max-h-[400px] object-cover rounded-lg mb-4"
          />
        )}


        {/* Blog Content */}
        <div dangerouslySetInnerHTML={{ __html: blog.blogContent }}></div>

      </div>
    </div>
  );
};

export default BlogDetails;
