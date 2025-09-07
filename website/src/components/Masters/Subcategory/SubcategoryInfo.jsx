"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
export default function SubcategoryInfo() {
    const editor = useRef(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const Infoid = searchParams.get("id");

    const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [existingImages, setExistingImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
        if (Infoid) {
            axios
                .get(`/api/subcatinfo/get/${Infoid}`)
                .then((res) => {
                    const info = res.data;
                    console.log("info", info);

                    setTitle(info.subCategoryTitle);
                    setContent(info.subCategoryContent);
                    setSelectedCategory(`${info.categoryName}|${info.categoryId}`);
                    setSelectedSubcategory(`${info.subCategoryName}|${info.subCategoryId}`);
                    setExistingImages(info.imagesArray || []);
                    fetchSubcategories(info.categoryId);
                })
                .catch(() => {
                    Swal.fire("Error!", "Failed to fetch subcategory info.", "error");
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [Infoid]);

    const fetchCategories = async () => {
        const res = await axios.get("/api/category/get");
        setCategories(res.data);
    };

    const fetchSubcategories = async (catID) => {
        try {
            const { data } = await axios.get(`/api/subcategory/get/categoryId/${catID}`);
            if (!data.length) throw new Error();
            setSubcategories(data);
        } catch (error) {
            Swal.fire({
                icon: "warning",
                title: "No Subcategories",
                text: "Click to add a subcategory.",
                confirmButtonText: "Add",
            }).then((r) => {
                if (r.isConfirmed) router.push("/admin/master/subcategory");
            });
            setSubcategories([]);
        }
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const catId = value.split("|")[1];
        setSelectedCategory(value);
        setSelectedSubcategory("");
        fetchSubcategories(catId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = {};
        if (!title) validation.title = "Title is required";
        if (!content) validation.content = "Content is required";
        if (!selectedCategory) validation.category = "Category is required";
        if (!selectedSubcategory) validation.subcategory = "Subcategory is required";

        if (Object.keys(validation).length) return setErrors(validation);

        const payload = {
            subCategoryTitle: title,
            subCategoryContent: content,
            categoryName: selectedCategory.split("|")[0],
            categoryId: selectedCategory.split("|")[1],
            subCategoryName: selectedSubcategory.split("|")[0],
            subCategoryId: selectedSubcategory.split("|")[1],
            imagesArray: existingImages.length ? existingImages : [],
        };

        try {
            if (Infoid) {
                await axios.put(`/api/subcatinfo/put/${Infoid}`, payload);
                Swal.fire("Updated!", "Information updated successfully.", "success");
                // Clear states
                clearForm();
                router.push("/admin/master/subcategory-info-list");
            } else {
                await axios.post(`/api/subcatinfo/post`, payload);
                Swal.fire("Created!", "Information added successfully.", "success");
                // Clear states
                clearForm();
                router.push("/admin/master/subcategory-info-list");
            }
        } catch (err) {
            Swal.fire("Error!", err?.response?.data?.message || "Something went wrong.", "error");
        }
    };
    
    const clearForm = () => {
        setTitle("");
        setContent("");
        setSelectedCategory("");
        setSelectedSubcategory("");
        setExistingImages([]);
        setErrors({});
    };


    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="w-full max-w-5xl shadow-lg bg-white rounded-lg p-7">
                <h2 className="text-3xl font-semibold mb-4">{Infoid ? "Edit" : "Add"} Subcategory Info</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        {/* Category Dropdown */}
                        <div className="w-full">
                            <label className="block text-sm">Category</label>
                            <select
                                className="w-full border rounded-lg p-2"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
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

                        {/* Subcategory Dropdown */}
                        <div className="w-full">
                            <label className="block text-sm">Subcategory</label>
                            <select
                                className="w-full border rounded-lg p-2"
                                value={selectedSubcategory}
                                onChange={(e) => setSelectedSubcategory(e.target.value)}
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

                    {/* Title */}
                    <div className="my-3">
                        <label className="block text-sm">Title</label>
                        <input
                            className="w-full border rounded-lg p-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm">Content</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1}
                            onBlur={(val) => setContent(val)}
                            onChange={() => { }}
                        />
                        {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                    </div>

                    {/* Images */}
                    <div className="mt-4">
                        <label className="block text-sm">Upload Image</label>
                        <CldUploadWidget
                            uploadPreset="userPropertyImg"
                            onSuccess={(res) => {
                                if (res?.info?.secure_url) {
                                    setExistingImages([...existingImages, res.info.secure_url]);
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

                        <div className="mt-4 flex gap-2 flex-wrap">
                            {existingImages.map((url, i) => (
                                <div key={i} className="relative group w-24 h-24">
                                    <img src={url} className="w-full h-full object-cover rounded-md border" />
                                    <button
                                        type="button"
                                        onClick={() => setExistingImages(existingImages.filter((_, idx) => idx !== i))}
                                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <FaTrash className="text-xs" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full mt-6 bg-blue-600 text-white p-2 rounded-lg">
                        {Infoid ? "Update" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
