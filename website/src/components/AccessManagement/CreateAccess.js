"use client";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const roles = JSON.parse(process.env.NEXT_PUBLIC_ROLES || "[]");
const modules = JSON.parse(process.env.NEXT_PUBLIC_Services || "[]");
const permissions = ['read', 'write', 'delete', 'all'];

const CreateAccess = () => {
    const [selectedRole, setSelectedRole] = useState(roles[0] || '');
    const [moduleAccess, setModuleAccess] = useState({});

    useEffect(() => {
        // Initialize access state
        const initialModuleAccess = modules.reduce((acc, moduleName) => {
            acc[moduleName] = { read: false, write: false, delete: false, all: false };
            return acc;
        }, {});
        setModuleAccess(initialModuleAccess);
    }, []);

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleViewRole = async () => {
        try {
            const response = await axios.get(`/api/roleaccess/get/${selectedRole}`);
            const accessData = response.data;

            const updatedModuleAccess = modules.reduce((acc, moduleName) => {
                const moduleEntry = accessData.find(item => item.module === moduleName);
                acc[moduleName] = moduleEntry ? {
                    read: !!moduleEntry.can_read,
                    write: !!moduleEntry.can_write,
                    delete: !!moduleEntry.can_delete,
                    all: !!moduleEntry.can_all
                } : { read: false, write: false, delete: false, all: false };
                return acc;
            }, {});
            
            setModuleAccess(updatedModuleAccess);
        } catch (error) {
            console.error("Error fetching role data:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load role permissions.',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleCheckboxChange = (moduleName, permission) => (e) => {
        const isChecked = e.target.checked;
        setModuleAccess(prev => {
            const current = { ...prev[moduleName] };
            if (permission === 'all') {
                current.all = isChecked;
                current.read = isChecked;
                current.write = isChecked;
                current.delete = isChecked;
            } else {
                current[permission] = isChecked;
                current.all = current.read && current.write && current.delete;
            }
            return { ...prev, [moduleName]: current };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessConfig = { role: selectedRole, modules: moduleAccess };

        try {
            const response = await axios.post('/api/roleaccess/post', accessConfig);
            console.log('API Response:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Access settings saved!',
                text: 'Your access configuration has been successfully saved.',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error('Error saving access configuration:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was a problem saving your access configuration.',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Access Management</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
                <div className="mb-6 flex justify-between items-center">
                    <div className="w-3/4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="role">
                            Select Role
                        </label>
                        <select
                            id="role"
                            value={selectedRole}
                            onChange={handleRoleChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={handleViewRole}
                        className="px-4 py-2 mt-8 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                    >
                        View Role
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left">Module</th>
                                {permissions.map(perm => (
                                    <th key={perm} className="py-3 px-4 text-center capitalize">{perm}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {modules.map(moduleName => (
                                <tr key={moduleName} className="border-t">
                                    <td className="py-3 px-4 font-medium">{moduleName}</td>
                                    {permissions.map(perm => (
                                        <td key={perm} className="py-3 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                className="h-5 w-5 text-blue-600"
                                                checked={moduleAccess[moduleName]?.[perm] || false}
                                                onChange={handleCheckboxChange(moduleName, perm)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Save Access Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAccess;
