"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import slugify from "slugify";
import Navbar from "@/components/widgets/Common/Navbar";

const BlogWebDetails = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get('slug');

  const [blog, setBlog] = useState(null);


  console.log('id', id);

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



  if (!blog) return <p className="text-center">Loading...</p>;

  return (


    <div className=" mx-auto p-4">
      <Navbar/>
      <div className="mx-auto rounded-lg shadow-md">
       
        {Array.isArray(blog.imagesArray) && blog.imagesArray.length > 0 && blog.imagesArray[0] && (
          <img
            src={blog.imagesArray[0]}
            alt={blog.blogTitle}
            className="w-full max-h-[400px] object-cover rounded-lg mb-4"
          />
        )}

        <div className="flex gap-4 bg-slate-100 p-4 rounded-md">
          {/* Left Section */}
          <div className="w-1/3 bg-white p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">FAQs</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-700">Q: What is the purpose of this blog?</p>
                <p className="text-sm text-gray-600">This blog shares insights and tips related to mother and child care.</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Q: Who can benefit from this?</p>
                <p className="text-sm text-gray-600">Expecting mothers, new parents, and caregivers can benefit the most.</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Q: How often is the blog updated?</p>
                <p className="text-sm text-gray-600">We update the blog every week with new content and expert advice.</p>
              </div>
            </div>
          </div>


          {/* Right Section */}
          <div className="w-2/3 bg-white p-4 rounded-md shadow">
            <div dangerouslySetInnerHTML={{ __html: blog.blogContent }} />
          </div>
        </div>
      </div>
    </div>


  );
};

export default BlogWebDetails;
