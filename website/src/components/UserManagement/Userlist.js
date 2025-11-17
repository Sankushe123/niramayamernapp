"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
export default function Userlist() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedRole === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === selectedRole));
    }
  }, [selectedRole, users]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/user/get/get-user");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {

    console.log("id",id);
    
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`/api/user/delete/delete-user/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "User has been deleted.", "success");
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/user-management/add-user/${id}`);
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredUsers.map(({ first_name, last_name, email, phone_number, gender, role, address, city, aadhar_no }) => ({
        Name: `${first_name} ${last_name}`,
        Email: email,
        Phone: phone_number,
        Gender: gender,
        Role: role,
        Address: address,
        City: city,
        Aadhar: aadhar_no,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, `users_${selectedRole}_list.xlsx`);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-6 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">User List</h1>
        <div className="flex gap-3 items-center">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={exportToExcel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded-md text-sm transition"
          >
            Download Excel
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-gray-700 text-sm font-medium">
              <th className="px-4 py-3 border">User Info</th>
              <th className="px-4 py-3 border">Gender</th>
              <th className="px-4 py-3 border">Role</th>
              <th className="px-4 py-3 border">Address</th>
              <th className="px-4 py-3 border">City</th>
              <th className="px-4 py-3 border">Aadhar No</th>
              <th className="px-4 py-3 border">Aadhar Image</th>
              <th className="px-4 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-500">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="even:bg-gray-50 hover:bg-gray-100 transition duration-200">
                  <td className="px-4 py-3 border">
                    <p className="font-medium text-gray-800">{user.first_name} {user.last_name}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                    <p className="text-gray-500 text-xs">{user.phone_number}</p>
                    <p className="text-gray-500 text-xs">{user.additional_number || "-"}</p>
                  </td>
                  <td className="px-4 py-3 border">{user.gender}</td>
                  <td className="px-4 py-3 border">{user.role}</td>
                  <td className="px-4 py-3 border">{user.address}</td>
                  <td className="px-4 py-3 border">{user.city}</td>
                  <td className="px-4 py-3 border">{user.aadhar_no}</td>
                  <td className="px-4 py-3 border">
                    {user.aadhar_image ? (
                      <img
                        src={user.aadhar_image}
                        alt="Aadhar"
                        className="h-10 w-10 object-cover rounded-full border"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border text-center space-x-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
