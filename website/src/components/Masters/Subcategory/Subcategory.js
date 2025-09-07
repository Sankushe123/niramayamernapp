'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function SubCategory() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [editingId, setEditingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, []);

    

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/category/get');
            setCategories(res.data);
        } catch {
            Swal.fire('Error!', 'Failed to fetch categories.', 'error');
        }
    };

    const fetchSubCategories = async () => {
        try {
            const res = await axios.get('/api/subcategory/get');
            setSubCategories(res.data);
        } catch {
            Swal.fire('Error!', 'Failed to fetch subcategories.', 'error');
        }
    };

    const handleAddOrUpdate = async () => {
        if (!categoryId || !subCategoryName.trim()) {
            Swal.fire('Warning!', 'Please select a category and enter a subcategory name.', 'warning');
            return;
        }

        const [id, name] = categoryId.split('|');

        try {
            if (editingId) {
                await axios.put(`/api/subcategory/put/${editingId}`, {
                    categoryId: id,
                    subCategoryName,
                });
                Swal.fire('Updated!', 'Subcategory has been updated.', 'success');
            } else {
                await axios.post('/api/subcategory/post', {
                    categoryId: id,
                    categoryName: name,
                    subCategoryName,
                });
                Swal.fire('Added!', 'Subcategory has been added.', 'success');
            }

            setCategoryId('');
            setSubCategoryName('');
            setEditingId(null);
            fetchSubCategories();
        } catch {
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    const handleEdit = (id, categoryId, categoryName, name) => {
        
        setCategoryId(`${categoryId._id}|${categoryName}`); // exact match to <option> value
        setSubCategoryName(name);
        setEditingId(id);
    };


    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/subcategory/delete/${id}`);
                    Swal.fire('Deleted!', 'Subcategory has been deleted.', 'success');
                    fetchSubCategories();
                } catch {
                    Swal.fire('Error!', 'Failed to delete subcategory.', 'error');
                }
            }
        });
    };

    // Filtered + paginated data
    const filteredSubCategories = useMemo(() => {
        return subCategories
            .filter((sub) =>
                sub.subCategoryName?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((sub) =>
                filterCategory ? sub.categoryId === filterCategory : true
            );
    }, [subCategories, searchTerm, filterCategory]);

    const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);
    const paginatedSubCategories = filteredSubCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Subcategory Master</h2>

            {/* Add / Edit Form */}
            <div className="flex flex-col md:flex-row gap-3 mb-12 items-center justify-between">
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="border p-2 w-full md:w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={`${cat._id}|${cat.categoryName}`}>
                            {cat.categoryName}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    placeholder="Enter subcategory name"
                    className="border p-2 w-full md:w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleAddOrUpdate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                    <PlusCircle size={20} /> {editingId ? 'Update' : 'Add'}
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-16 mb-4">
                {/* Filter by Category */}
                <select
                    value={filterCategory}
                    onChange={(e) => {
                        setFilterCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border p-2 w-full md:w-1/5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.categoryName}
                        </option>
                    ))}
                </select>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search subcategories..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border p-2 w-full md:w-2/5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Subcategory Table */}
            <table className="w-full table-auto border-collapse mt-4 text-sm">
                <thead className="bg-blue-100 text-left text-gray-700">
                    <tr>
                        <th className="p-3">Category</th>
                        <th className="p-3">Subcategory</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedSubCategories.map((sub) => (
                        <tr key={sub._id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{sub.categoryName}</td>
                            <td className="p-3">{sub.subCategoryName}</td>
                            <td className="p-3 flex justify-center gap-2">
                                <button
                                    onClick={() =>
                                        handleEdit(sub._id, sub.categoryId, sub.categoryName, sub.subCategoryName)
                                    }
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(sub._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}

                    {paginatedSubCategories.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center p-6 text-gray-500">
                                No subcategories found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
