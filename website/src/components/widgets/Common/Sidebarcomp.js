'use client'
import { useState, useCallback } from "react";
import { Menu, X, ChevronDown, MessageCircle, Home, User, Settings, LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, user }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const router = useRouter();

  const toggleSubMenu = useCallback((menu) => {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    router.push("/admin/login");
  };


  const menuItems = [
    { title: "Dashboard", icon: Home, link: "/admin" },
    {
      title: "Masters",
      icon: MessageCircle,
      subMenu: [
        { label: "Category", link: "/admin/master/category" },
        { label: "Sub-Category", link: "/admin/master/subcategory" },
        { label: "Sub-Category Info", link: "/admin/master/subcategory-info" },
        { label: "Sub-Category Info List", link: "/admin/master/subcategory-info-list" },
      ]
    },
    {
      title: "Appointment",
      icon: MessageCircle,
      subMenu: [
        { label: "Check List", link: "/admin/appointment-management/get-list" },
      ]
    },
    {
      title: "Blogs",
      icon: MessageCircle,
      subMenu: [
        { label: "Add Blog", link: "/admin/blog-management/add-blog" },
        { label: "All Blogs", link: "/admin/blog-management/list-blogs" }
      ]
    },
    {
      title: "Users",
      icon: MessageCircle,
      subMenu: [
        { label: "Add User", link: "/admin/user-management/add-user" },
        { label: "Users List", link: "/admin/user-management/user-list" }
      ]
    },
    {
      title: "FAQ",
      icon: MessageCircle,
      subMenu: [{ label: "Add FAQ", link: "/admin/faq-management/add-faq" }]
    },
    {
      title: "Access Control",
      icon: MessageCircle,
      subMenu: [{ label: "Create Access", link: "/admin/access-management/create-access" }]
    },
    {
      title: "Event Banner",
      icon: MessageCircle,
      subMenu: [{ label: "Event Banner", link: "/admin/banner-management" }]
    },
    {
      title: "Reviews Control",
      icon: MessageCircle,
      subMenu: [
        { label: "Add Review", link: "/admin/reviews-management/add-review" },
        { label: "List Review", link: "/admin/reviews-management/list-review" }

      ],
    }
  ];
  return (
    // <aside
    //     className={`${isSidebarOpen ? "min-w-60" : "min-w-14"} 
    //     bg-white shadow-md h-full transition-all duration-300 
    //     overflow-hidden flex flex-col items-center py-0`}
    // >
    //     <div className="p-2 flex justify-between items-center bg-gray-50 text-white w-full">
    //         {isSidebarOpen && <img src="/Images/niramayalogo.png" className="w-4/6 h-9 items-center mx-auto" />}
    //         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
    //             {!isSidebarOpen && <img src="/Images/smLogo.png" className="w-11 h-10" />}
    //         </button>
    //     </div>

    //     <nav className=" flex flex-col space-y-2 w-full p-2 flex-1">
    //         {menuItems.map((item, index) => (
    //             <div key={index} className="relative w-full group">
    //                 <button
    //                     className={`p-1.5 hover:bg-gray-200 rounded cursor-pointer flex items-center 
    //                     ${isSidebarOpen ? "justify-between" : "justify-center"} w-full`}
    //                     onClick={() => (item.subMenu ? toggleSubMenu(item.title) : router.push(item.link))}
    //                 >
    //                     <div className={`flex items-center ${!isSidebarOpen && "justify-center w-full"}`}>
    //                         <item.icon className="w-5 h-5" />
    //                         {isSidebarOpen && <span className="ml-2">{item.title}</span>}
    //                     </div>
    //                     {isSidebarOpen && item.subMenu?.length > 0 && (
    //                         <ChevronDown className={`w-4 h-4 transition-transform ${openSubMenu === item.title ? "rotate-180" : "rotate-0"}`} />
    //                     )}
    //                 </button>

    //                 {!isSidebarOpen && (
    //                     <span className="absolute left-16 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
    //                         {item.title}
    //                     </span>
    //                 )}

    //                 {isSidebarOpen && openSubMenu === item.title && item.subMenu?.length > 0 && (
    //                     <div className="pl-8 space-y-1 mt-0.5">
    //                         {item.subMenu.map((subItem, subIndex) => (
    //                             <button
    //                                 key={subIndex}
    //                                 className="p-1.5 hover:bg-gray-200 rounded cursor-pointer w-full text-left text-sm"
    //                                 onClick={() => router.push(subItem.link)}
    //                             >
    //                                 {subItem.label}
    //                             </button>
    //                         ))}
    //                     </div>
    //                 )}
    //             </div>
    //         ))}
    //     </nav>

    //     {/* Profile Section */}
    //     <div className="p-3 w-full border-t flex flex-col items-center bg-gray-100">
    //         <div className="flex items-center space-x-2">
    //             <User className="w-6 h-6 text-gray-700" />
    //             {isSidebarOpen && (
    //                 <div className="text-gray-800">
    //                     <p className="font-semibold text-sm">{`${user?.first_name} ${user?.last_name} ` || "Admin"}</p>
    //                     <p className="text-xs text-gray-600">{user?.role || "Administrator"}</p>
    //                 </div>
    //             )}
    //         </div>
    //         <div className="flex flex-col space-y-1 mt-3 w-full">
    //             {/* <button className="flex items-center space-x-2 p-2 hover:bg-gray-200 w-full rounded" onClick={() => router.push('/settings')}> */}
    //             <button className="flex items-center space-x-2 p-2 hover:bg-gray-200 w-full rounded">
    //                 <Settings className="w-5 h-5 text-gray-700" />
    //                 {isSidebarOpen && <span>Settings</span>}
    //             </button>
    //             <button className="flex items-center space-x-2 p-2 hover:bg-gray-200 w-full rounded" onClick={handleLogout}>
    //                 <LogOut onClick={() => { handleLogout }} className="w-5 h-5 text-red-600" />
    //                 {isSidebarOpen && <span className="text-red-600">Logout</span>}
    //             </button>
    //         </div>
    //     </div>
    // </aside>
    <aside
      className={`${isSidebarOpen ? "w-60" : "w-14"
        } bg-white shadow-md h-full transition-all duration-300 flex flex-col items-center py-0`}
    >
      <div className="p-2 flex justify-between items-center bg-gray-50 text-white w-full">
        {isSidebarOpen && (
          <img
            src="/Images/niramayalogo.png"
            className="w-4/6 h-9 items-center mx-auto"
          />
        )}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {!isSidebarOpen && (
            <img src="/Images/smLogo.png" className="w-11 h-10" />
          )}
        </button>
      </div>

      <nav className="flex flex-col space-y-2 w-full p-2 flex-1">
        {menuItems.map((item, index) => (
          <div key={index} className="relative w-full group">
            <button
              className={`p-1.5 hover:bg-gray-200 rounded cursor-pointer flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"
                } w-full`}
              onClick={() =>
                item.subMenu ? toggleSubMenu(item.title) : router.push(item.link)
              }
            >
              <div
                className={`flex items-center ${!isSidebarOpen && "justify-center w-full"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && (
                  <span className="ml-2 text-sm truncate max-w-[140px] overflow-hidden block">
                    {item.title}
                  </span>
                )}
              </div>
              {isSidebarOpen && item.subMenu?.length > 0 && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${openSubMenu === item.title ? "rotate-180" : "rotate-0"
                    }`}
                />
              )}
            </button>

            {!isSidebarOpen && (
              <span className="absolute left-16 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title}
              </span>
            )}

            {isSidebarOpen &&
              openSubMenu === item.title &&
              item.subMenu?.length > 0 && (
                <div className="pl-8 space-y-1 mt-0.5">
                  {item.subMenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="p-1.5 hover:bg-gray-200 rounded cursor-pointer w-full text-left text-xs"
                      onClick={() => router.push(subItem.link)}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="p-3 w-full border-t flex flex-col items-center bg-gray-100">
        <div className="flex items-center space-x-2">
          <User className="w-6 h-6 text-gray-700" />
          {isSidebarOpen && (
            <div className="text-gray-800">
              <p className="font-semibold text-sm">
                {`${user?.first_name} ${user?.last_name}` || "Admin"}
              </p>
              <p className="text-xs text-gray-600">
                {user?.role || "Administrator"}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-1 mt-3 w-full">
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-200 w-full rounded">
            <Settings className="w-5 h-5 text-gray-700" />
            {isSidebarOpen && <span className="text-sm">Settings</span>}
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 w-full rounded"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-red-600" />
            {isSidebarOpen && (
              <span className="text-sm text-red-600">Logout</span>
            )}
          </button>
        </div>
      </div>
    </aside>

  );
};

export default Sidebar;
