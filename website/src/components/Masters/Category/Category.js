'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function CategoryMaster() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/category/get');
      setCategories(res.data);
      console.log('res.data',res.data);
      
    } catch (error) {
      Swal.fire('Error!', 'Failed to fetch categories.', 'error');
    }
  };

  const handleAddOrUpdate = async () => {
    if (!categoryName.trim()) return;

    try {
      if (editingId !== null) {
        await axios.put(`/api/category/put/${editingId}`, {categoryName });
        Swal.fire('Updated!', 'Category has been updated.', 'success');
      } else {
        await axios.post('/api/category/post', { categoryName });
        Swal.fire('Added!', 'Category has been added.', 'success');
      }
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }

    setCategoryName('');
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (id, name) => {
    setCategoryName(name)
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/category/delete/${id}`);
          Swal.fire('Deleted!', 'Category has been deleted.', 'success');
          fetchCategories();
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete category.', 'error');
        }
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold  mb-10">Category Master</h2>
      <div className='max-w-xl mx-auto'>


        <div className="flex gap-2">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusCircle size={20} /> {editingId !== null ? 'Update' : 'Add'}
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span className="text-lg">{category.categoryName}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category._id, category.categoryName)}
                  className="px-1 py-1 rounded-sm hover:text-gray-600"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="px-1 py-1 rounded-sm hover:text-gray-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
