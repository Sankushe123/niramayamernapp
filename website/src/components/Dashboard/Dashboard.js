"use client"
import ProtectedComponent from "@/components/widgets/auth/ProtectedComponent";

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <ProtectedComponent module="Dashboard" requiredPermission="can_read">
        <p>📄 You can view this content.</p>
      </ProtectedComponent>

      <ProtectedComponent module="Dashboard" requiredPermission="can_write">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">✏️ Edit Content</button>
      </ProtectedComponent>
      <button className="bg-red-500 text-white px-4 py-2 rounded">🗑 Delete Item</button>

      
    </div>
  );
};

export default Dashboard;
