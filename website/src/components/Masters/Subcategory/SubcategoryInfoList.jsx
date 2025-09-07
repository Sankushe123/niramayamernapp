"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 5;

export default function SubcategoryInfoList() {
  const [infoList, setInfoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  // Fetch data
  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await axios.get("/api/subcatinfo/get");
      console.log(res);
      
      setInfoList(res.data);
      setFilteredList(res.data);
    } catch (error) {
      console.error("Failed to fetch subcategory info", error);
    }
  };

  // Search, Filter, Pagination
  useEffect(() => {
    let filtered = [...infoList];

    if (searchTerm)
      filtered = filtered.filter((item) =>
        item.subCategoryTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (selectedCategory)
      filtered = filtered.filter((item) => item.categoryName === selectedCategory);

    if (selectedSubCategory)
      filtered = filtered.filter((item) => item.subCategoryName === selectedSubCategory);

    setFilteredList(filtered);
    setCurrentPage(1); 
  }, [searchTerm, selectedCategory, selectedSubCategory, infoList]);

  const deleteItem = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the Info!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/api/subcatinfo/delete/${id}`);
        fetchList();
        Swal.fire("Deleted!", "SubInfo has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  const categories = [...new Set(infoList.map((item) => item.categoryName))];
  const subCategories = [...new Set(infoList.map((item) => item.subCategoryName))];

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">SubCategory Info List</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="border px-3 py-1 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="">All SubCategories</option>
          {subCategories.map((sub, i) => (
            <option key={i} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">SubCategory</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.length > 0 ? (
              paginatedList.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.subCategoryTitle}</td>
                  <td className="p-2">{item.categoryName}</td>
                  <td className="p-2">{item.subCategoryName}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() =>
                        router.push(`/admin/master/subcategory-info?id=${item._id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteItem(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
