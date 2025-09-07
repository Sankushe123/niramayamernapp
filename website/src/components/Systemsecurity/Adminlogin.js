"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both email and password",
      });
    }

    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });

      console.log('response');
      

      if (response.data?.token && response.data?.user) {

        sessionStorage.setItem("authToken", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting to dashboard...",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push("/admin"); // redirect to admin dashboard
        }, 1600);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Email or password is incorrect.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMsg,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
