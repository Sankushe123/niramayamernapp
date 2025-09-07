"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import slugify from "slugify";
import dynamic from "next/dynamic";

// Dynamically import client-only components with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

export default function AddBlog() {
  const editor = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Check if editing an existing blog

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [existingImages, setExistingImages] = useState([]); // Already uploaded images
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    fetchCategories();
    if (id) {
      axios
        .get(`/api/blogs/get/${id}`)
        .then((response) => {
          const blogData = response.data;
          setSelectedCategory(`${blogData.blogCategory}|${blogData.blogCatID}`);
          setBlogTitle(blogData.blogTitle);
          setBlogContent(blogData.blogContent);
          setExistingImages(blogData.imagesArray || []);
          // Fetch subcategories for category and then set selectedSubcategory after
          fetchSubcategories(blogData.blogCatID).then(() => {
            setSelectedSubcategory(`${blogData.blogSubcategory}|${blogData.blogSubCatID}`);
          });
        })
        .catch((error) => console.error("Error fetching blog:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/get");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const { data } = await axios.get(`/api/subcategory/get/categoryId/${categoryId}`);
      if (!data || data.length === 0) {
        throw new Error("No subcategories found.");
      }
      setSubcategories(data);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: "warning",
          title: "No Subcategories",
          text: "No subcategories found for the selected category. To add subcategory, Click Here",
          confirmButtonText: "Add Subcategory",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/admin/master/subcategory");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while fetching subcategories.",
        });
      }

      setSubcategories([]);
      return [];
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value; // e.g. "CategoryName|categoryId"
    setSelectedCategory(value);
    setSelectedSubcategory("");
    const catId = value.split("|")[1];
    fetchSubcategories(catId);
  };

  const handleRemoveImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!blogTitle) validationErrors.blogTitle = "Blog title is required";
    if (!blogContent) validationErrors.blogContent = "Blog content is required";
    if (!selectedCategory) validationErrors.category = "Category is required";
    if (!selectedSubcategory) validationErrors.subcategory = "Subcategory is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const blogData = {
      blogTitle,
      blogContent,
      blogCategory: selectedCategory.split("|")[0],
      blogSubcategory: selectedSubcategory.split("|")[0],
      blogCatID: selectedCategory.split("|")[1],
      blogSubCatID: selectedSubcategory.split("|")[1],
      imagesArray: existingImages,
    };

    try {
      let response;

      if (id) {
        // Update Blog
        response = await axios.put(`/api/blogs/put/${id}`, blogData);
        Swal.fire({
          icon: "success",
          title: "Blog Updated!",
          text: "Your blog has been successfully updated.",
        });

        router.push(`/admin/blog-management/view-blog/${response.data.slug}`);
      } else {
        // Create New Blog
        response = await axios.post("/api/blogs/post", blogData);
        Swal.fire({
          icon: "success",
          title: "Blog Posted!",
          text: "Your blog has been successfully submitted.",
        });

        router.push(`/admin/blog-management/view-blog?id=${response.data._id}`);
      }
    } catch (error) {
      console.error("Error in blog submission:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: error.response?.data?.message || "An error occurred. Please try again.",
      });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl shadow-lg bg-white rounded-lg p-7">
        <h2 className="text-3xl font-semibold mb-4">{id ? "Edit Blog" : "Create New Blog"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-full mb-3">
              <label className="block font-medium">Category</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={`${cat.categoryName}|${cat._id}`}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div className="w-full mb-3">
              <label className="block font-medium">Subcategory</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full border rounded-lg p-2"
                disabled={!selectedCategory}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={`${sub.subCategoryName}|${sub._id}`}>
                    {sub.subCategoryName}
                  </option>
                ))}
              </select>
              {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory}</p>}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="blogTitle" className="block font-medium">
              Blog Title
            </label>
            <input
              id="blogTitle"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full border rounded-lg p-2 mt-1"
            />
            {errors.blogTitle && <p className="text-red-500 text-sm">{errors.blogTitle}</p>}
          </div>

          <div>
            <label className="block font-medium">Blog Content</label>
            <JoditEditor
              ref={editor}
              value={blogContent}
              tabIndex={1}
              onBlur={(newContent) => setBlogContent(newContent)}
              onChange={() => {}}
              className="w-full border rounded-lg p-2 mt-1 h-32 resize-none"
            />
            {errors.blogContent && <p className="text-red-500 text-sm">{errors.blogContent}</p>}
          </div>

          {/* Image Upload */}
          <div className="mt-3">
            <label className="block font-medium">Upload Images</label>
            <CldUploadWidget
              uploadPreset="userPropertyImg"
              onSuccess={(result) => {
                if (result?.info?.secure_url) {
                  setExistingImages([...existingImages, result.info.secure_url]);
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  className="bg-gray-600 text-white rounded-lg p-2 mt-2"
                  onClick={() => open()}
                >
                  Upload
                </button>
              )}
            </CldUploadWidget>

            {/* Display Uploaded Images */}
            {existingImages.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {existingImages.map((url, index) => (
                  <div key={index} className="relative group w-24 h-24">
                    <img src={url} alt="Preview" className="w-24 h-24 object-cover rounded-lg border" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="w-full mt-4 bg-blue-600 text-white rounded-lg p-2">
            {id ? "Update Blog" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
