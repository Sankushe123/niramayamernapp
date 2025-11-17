// "use client";
// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";
// import bcrypt from "bcryptjs";
// import { useParams } from "next/navigation";
// const roles = JSON.parse(process.env.NEXT_PUBLIC_ROLES || "[]");

// const Adduser = ({ existingUser = null }) => {

//   const params = useParams();

//   console.log("params", params.uid);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     additionalNumber: "",
//     email: "",
//     gender: "",
//     address: "",
//     city: "",
//     pincode: "",
//     password: "",
//     confirmPassword: "",
//     aadharNo: "",
//     aadharImage: "",
//     role: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [selectedRole, setSelectedRole] = useState("");

//   useEffect(() => {
//     if()
//   },[])

//   useEffect(() => {
//     if (existingUser) {
//       setFormData(existingUser);
//       setSelectedRole(existingUser.role);
//     }
//   }, [existingUser]);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "file" ? files[0] : value,
//     }));
//   };

//   const validatePassword = (password) => {
//     const errors = [];

//     if (password.length < 8) {
//       errors.push("at least 8 characters long");
//     }
//     if (!/[A-Z]/.test(password)) {
//       errors.push("at least one uppercase letter");
//     }
//     if (!/[a-z]/.test(password)) {
//       errors.push("at least one lowercase letter");
//     }
//     if (!/[0-9]/.test(password)) {
//       errors.push("at least one digit");
//     }
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       errors.push("at least one special character");
//     }

//     return errors;
//   };

//   // Validate form fields
//   const validateForm = () => {
//     let tempErrors = {};

//     // First Name, Last Name, Phone Number, Email validation
//     if (!formData.firstName.trim()) tempErrors.firstName = "First Name is required";
//     if (!formData.lastName.trim()) tempErrors.lastName = "Last Name is required";
//     if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber))
//       tempErrors.phoneNumber = "Phone Number must be 10 digits";
//     if (formData.role === "receptionist" && (!formData.additionalNumber.trim() || !/^\d{10}$/.test(formData.additionalNumber)))
//       tempErrors.additionalNumber = "Additional Number must be 10 digits";
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
//       tempErrors.email = "Invalid email format";
//     if (!formData.role) tempErrors.role = "Role selection is required";

//     // Password Validation
//     const passwordErrors = validatePassword(formData.password);
//     if (passwordErrors.length > 0) {
//       tempErrors.password = passwordErrors.join(" ");
//     }

//     if (formData.password !== formData.confirmPassword) {
//       tempErrors.confirmPassword = "Passwords must match";
//     }

//     // Aadhaar Number and Aadhaar Image validation
//     if (formData.role === "receptionist") {
//       if (!formData.aadharNo.trim() || !/^\d{12}$/.test(formData.aadharNo))
//         tempErrors.aadharNo = "Aadhaar Number must be 12 digits";
//       if (!formData.aadharImage) tempErrors.aadharImage = "Aadhaar Image is required";
//     }

//     // Pincode Validation
//     if (formData.pincode && !/^\d{6}$/.test(formData.pincode))
//       tempErrors.pincode = "Pincode must be 6 digits";

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Validate form before submission
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       // Hash the password before sending
//       const hashedPassword = await bcrypt.hash(formData.password, 10); // Salt rounds = 10

//       const formDataToSend = {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         phone_number: formData.phoneNumber,
//         additional_number: formData.additionalNumber || "",
//         email: formData.email,
//         gender: formData.gender,
//         address: formData.address,
//         city: formData.city,
//         password: hashedPassword,
//         role: formData.role,
//         aadhar_no: formData.aadharNo,
//         aadhar_image: formData.aadharImage || "",
//       };

//       if (existingUser) {
//         await axios.put(`/api/user/put/edit-user/${existingUser.id}`, formDataToSend);
//         Swal.fire({ icon: "success", title: "User Updated!", text: "User details have been successfully updated." });
//       } else {
//         await axios.post("/api/user/post/create-user", formDataToSend);
//         Swal.fire({ icon: "success", title: "User Added!", text: "User has been successfully created." });
//       }

//       // Reset form after successful submission
//       setFormData({
//         firstName: "",
//         lastName: "",
//         phoneNumber: "",
//         additionalNumber: "",
//         email: "",
//         gender: "",
//         address: "",
//         city: "",
//         password: "",
//         role: "",
//         aadharNo: "",
//         aadharImage: "",
//       });
//       setSelectedRole("");
//     } catch (error) {
//       Swal.fire({ icon: "error", title: "Submission Failed", text: error.response?.data?.message || "Something went wrong!" });
//       console.error("Error submitting form:", error.response?.data || error);
//     }
//   };



//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">
//         {existingUser ? "Edit User" : "Add User"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-col md:flex-row gap-x-4">
//           <div className="w-full">
//             <label className="block text-gray-600">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//             />
//             {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
//           </div>

//           <div className="w-full">
//             <label className="block text-gray-600">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//             />
//             {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-x-4">
//           <div className="w-full">
//             <label className="block text-gray-600">Phone Number</label>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//             />
//             {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
//           </div>

//           <div className="w-full">
//             <label className="block text-gray-600">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>
//         </div>

//         <div>
//           <label className="block text-gray-600">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//           />
//         </div>

//         <div className="flex flex-col md:flex-row gap-x-4">
//           <div className="w-full">
//             <label className="block text-gray-600">City</label>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//             />
//           </div>

//           <div className="w-full">
//             <label className="block text-gray-600">Pincode</label>
//             <input
//               type="text"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//             />
//             {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-x-4">
//           <div className="w-full">
//             <label className="block text-gray-600">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>

//           <div className="w-full">
//             <label className="block text-gray-600">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//             />
//             {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
//           </div>
//         </div>

//         <div>
//           <label className="block text-gray-600">Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={(e) => {
//               handleChange(e);
//               setSelectedRole(e.target.value);
//             }}
//             className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//           >
//             <option value="">Select Role</option>
//             {roles.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>
//           {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
//         </div>

//         {selectedRole === "receptionist" && (
//           <>
//             <div>
//               <label className="block text-gray-600">Aadhaar No</label>
//               <input
//                 type="text"
//                 name="aadharNo"
//                 value={formData.aadharNo}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//               />
//               {errors.aadharNo && <p className="text-red-500 text-sm">{errors.aadharNo}</p>}
//             </div>

//             <div>
//               <label className="block text-gray-600">Additional Phone Number</label>
//               <input
//                 type="text"
//                 name="additionalNumber"
//                 value={formData.additionalNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-600">Aadhaar Image</label>
//               <input
//                 type="file"
//                 name="aadharImage"
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
//               />
//               {errors.aadharImage && <p className="text-red-500 text-sm">{errors.aadharImage}</p>}
//             </div>
//           </>
//         )}

//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="px-8 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-500 transition"
//           >
//             {existingUser ? "Update User" : "Add User"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Adduser;

"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useParams, useRouter } from "next/navigation";

const roles = JSON.parse(process.env.NEXT_PUBLIC_ROLES || "[]");

const Adduser = ({ existingUser = null }) => {
  const params = useParams();
  const router = useRouter();
  const userId = params?.uid; // URL param (used in edit mode)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    additionalNumber: "",
    email: "",
    gender: "",
    address: "",
    city: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    aadharNo: "",
    aadharImage: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // 🟢 Fetch existing user data if in edit mode
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        setIsEditMode(true);
        try {
          const { data } = await axios.get(`/api/user/get/get-one-user/${userId}`);
          const user = data.user || data; // handle either {user: {...}} or {...}
          setFormData({
            firstName: user.first_name || "",
            lastName: user.last_name || "",
            phoneNumber: user.phone_number || "",
            additionalNumber: user.additional_number || "",
            email: user.email || "",
            gender: user.gender || "",
            address: user.address || "",
            city: user.city || "",
            pincode: user.pincode || "",
            password: "",
            confirmPassword: "",
            aadharNo: user.aadhar_no || "",
            aadharImage: user.aadhar_image || "",
            role: user.role || "",
          });
          setSelectedRole(user.role || "");
        } catch (error) {
          console.error("Error fetching user:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to Load",
            text: "Unable to fetch user details. Please try again.",
          });
        }
      }
    };

    fetchUser();
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Password validation
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("at least 8 characters long");
    if (!/[A-Z]/.test(password)) errors.push("at least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("at least one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("at least one digit");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      errors.push("at least one special character");
    return errors;
  };

  // Validate form fields
  const validateForm = () => {
    let tempErrors = {};

    if (!formData.firstName.trim()) tempErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber))
      tempErrors.phoneNumber = "Phone Number must be 10 digits";
    if (
      formData.role === "receptionist" &&
      (!formData.additionalNumber.trim() ||
        !/^\d{10}$/.test(formData.additionalNumber))
    )
      tempErrors.additionalNumber = "Additional Number must be 10 digits";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email format";
    if (!formData.role) tempErrors.role = "Role selection is required";

    // Password only required in Add mode or when changed
    if (!isEditMode || formData.password) {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        tempErrors.password = passwordErrors.join(" ");
      }
      if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = "Passwords must match";
      }
    }

    if (formData.role === "receptionist") {
      if (!formData.aadharNo.trim() || !/^\d{12}$/.test(formData.aadharNo))
        tempErrors.aadharNo = "Aadhaar Number must be 12 digits";
      if (!formData.aadharImage)
        tempErrors.aadharImage = "Aadhaar Image is required";
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode))
      tempErrors.pincode = "Pincode must be 6 digits";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const redirectToUserList = () => {
    router.push('/admin/user-management/user-list');
  }

  // 🟢 Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      let hashedPassword = "";
      if (formData.password) {
        hashedPassword = await bcrypt.hash(formData.password, 10);
      }

      const formDataToSend = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phoneNumber,
        additional_number: formData.additionalNumber || "",
        email: formData.email,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        password: hashedPassword || undefined, // don't send empty password
        role: formData.role,
        aadhar_no: formData.aadharNo,
        aadhar_image: formData.aadharImage || "",
      };

      console.log("formDataToSend",formDataToSend);
      

      if (isEditMode) {
        await axios.put(`/api/user/put/edit-user/${userId}`, formDataToSend);
        Swal.fire({
          icon: "success",
          title: "User Updated!",
          text: "User details have been successfully updated.",
        });
        // redirectToUserList();
      } else {
        await axios.post("/api/user/post/create-user", formDataToSend);
        Swal.fire({
          icon: "success",
          title: "User Added!",
          text: "User has been successfully created.",
        });
        // redirectToUserList();
      }

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        additionalNumber: "",
        email: "",
        gender: "",
        address: "",
        city: "",
        pincode: "",
        password: "",
        confirmPassword: "",
        aadharNo: "",
        aadharImage: "",
        role: "",
      });
      setSelectedRole("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
      console.error("Error submitting form:", error.response?.data || error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        {isEditMode ? "Edit User" : "Add User"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="flex flex-col md:flex-row gap-x-4">
          <div className="w-full">
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col md:flex-row gap-x-4">
          <div className="w-full">
            <label className="block text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
          />
        </div>

        {/* City + Pincode */}
        <div className="flex flex-col md:flex-row gap-x-4">
          <div className="w-full">
            <label className="block text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-600">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col md:flex-row gap-x-4">
          <div className="w-full">
            <label className="block text-gray-600">
              Password {isEditMode && "(leave blank to keep current)"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-gray-600">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={(e) => {
              handleChange(e);
              setSelectedRole(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        {/* Receptionist Fields */}
        {selectedRole === "receptionist" && (
          <>
            <div>
              <label className="block text-gray-600">Aadhaar No</label>
              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
              />
              {errors.aadharNo && (
                <p className="text-red-500 text-sm">{errors.aadharNo}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600">Additional Phone Number</label>
              <input
                type="text"
                name="additionalNumber"
                value={formData.additionalNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-600">Aadhaar Image</label>
              <input
                type="file"
                name="aadharImage"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 text-sm"
              />
              {errors.aadharImage && (
                <p className="text-red-500 text-sm">{errors.aadharImage}</p>
              )}
            </div>
          </>
        )}

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-500 transition"
          >
            {isEditMode ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Adduser;

