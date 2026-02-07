"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setRole, fetchAccessData } from "@/store/accessSlice";
import Sidebar from "@/components/widgets/Common/Sidebarcomp";
import Header from "@/components/widgets/Common/Header";
import { Provider } from "react-redux";
import store from "@/store/store";

import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
// console.log('axios.defaults.baseURL',axios.defaults.baseURL);

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.access.role);
  const permissions = useSelector((state) => state.access.permissions);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("authToken");  // switched to sessionStorage
      const userRole = sessionStorage.getItem("user");

      if (!token && pathname !== "/admin/login") {
        router.replace("/admin/login");
        return;
      } 
      if (token && pathname === "/admin/login") {
        router.replace("/admin");
        return;
      }

      if (userRole) {
        const parsedUser = JSON.parse(userRole);
        setUserInfo(parsedUser);
        dispatch(setRole(parsedUser.role));
        dispatch(fetchAccessData(parsedUser.role));
      }
    }
  }, [pathname, dispatch, router]);

  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={userInfo}
      />
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="p-4 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayoutWithProvider({ children }) {
  return (
    <Provider store={store}>
      <AdminLayout>{children}</AdminLayout>
    </Provider>
  );
}
