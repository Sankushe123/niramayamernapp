"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

export default function Addfaq() {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    question: "",
    answer: "",
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    fetchFAQs();
    fetchCategories();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/faqs/get");
      setFaqs(data || []);
    } catch {
      setError("Failed to fetch FAQs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/get");
      setCategories(data || []);
    } catch {
      setError("Failed to fetch categories. Please try again.");
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const { data } = await axios.get(`/api/subcategory/get/categoryId/${categoryId}`);
      setSubcategories(data || []);
    } catch {
      setError("Failed to fetch subcategories. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const [categoryName, categoryId] = value.split("|");
      setFormData((prev) => ({
        ...prev,
        category: value,
        categoryName,
        categoryId,
        subcategory: "",
      }));
      setSelectedCategory(categoryId);
      fetchSubcategories(categoryId);
    } else if (name === "subcategory") {
      const [subCategoryName, subcategoryId] = value.split("|");
      setFormData((prev) => ({
        ...prev,
        subcategory: value,
        subCategoryName,
        subcategoryId,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.question.trim()) {
      Swal.fire("Validation Error", "Question cannot be empty!", "warning");
      return false;
    }
    if (!formData.answer.trim()) {
      Swal.fire("Validation Error", "Answer cannot be empty!", "warning");
      return false;
    }
    if (!formData.category) {
      Swal.fire("Validation Error", "Please select a category!", "warning");
      return false;
    }
    if (!formData.subcategory) {
      Swal.fire("Validation Error", "Please select a subcategory!", "warning");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      categoryId: formData.category.split('|')[1],
      categoryName: formData.category.split('|')[0],
      subcategoryId: formData.subcategory.split('|')[1],
      subCategoryName: formData.subcategory.split('|')[0],
    };

    try {
      if (formData.id) {
        await axios.put(`/api/faqs/put/${formData.id}`, payload);
        Swal.fire("Success", "FAQ Updated Successfully", "success");
      } else {
        await axios.post("/api/faqs/post", payload);
        Swal.fire("Success", "FAQ Added Successfully", "success");
      }
      setFormData({ id: null, question: "", answer: "", category: "", subcategory: "" });
      fetchFAQs();
    } catch {
      Swal.fire("Error", "Failed to save FAQ", "error");
    }
  };

  const handleEdit = (faq) => {
    setFormData({
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
      category: `${faq.categoryName}|${faq.categoryId}`,
      subcategory: `${faq.subCategoryName}|${faq.subcategoryId}`,
      categoryId: faq.categoryId,
      categoryName: faq.categoryName,
      subcategoryId: faq.subcategoryId,
      subCategoryName: faq.subCategoryName,
    });
    setSelectedCategory(faq.categoryId);
    fetchSubcategories(faq.categoryId);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/faqs/delete/${id}`);
          Swal.fire("Deleted!", "FAQ has been deleted.", "success");
          fetchFAQs();
        } catch {
          Swal.fire("Error", "Failed to delete FAQ", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">FAQ Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="question"
          placeholder="Enter Question"
          value={formData.question}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="answer"
          placeholder="Enter Answer"
          value={formData.answer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={`${cat.categoryName}|${cat._id}`}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={!selectedCategory}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub._id} value={`${sub.subCategoryName}|${sub._id}`}>
                {sub.subCategoryName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {formData.id ? "Update" : "Add"}
        </button>
      </form>

      {loading ? (
        <p>Loading FAQs...</p>
      ) : !faqs.length ? (
        <p className="text-gray-500 mt-4">No FAQs found.</p>
      ) : (
        <ul className="mt-6 space-y-2">
          {faqs.map((faq) => (
            <li key={faq._id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  {faq.categoryName} → {faq.subCategoryName}
                </p>
                <p className="font-bold">{faq.question} ?</p>
                <p>{faq.answer}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(faq)} className="px-3 py-2 rounded-sm border hover:bg-gray-200">
                  <TbEdit />
                </button>
                <button onClick={() => handleDelete(faq._id)} className="px-3 py-2 rounded-sm border hover:bg-gray-200">
                  <MdDeleteOutline />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
