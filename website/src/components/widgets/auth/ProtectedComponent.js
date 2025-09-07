import { useSelector } from "react-redux";

const ProtectedComponent = ({ module, requiredPermission, children }) => {
  const permissions = useSelector((state) => state.access.permissions);

  // ✅ Find the correct module's permissions
  const modulePermissions = permissions.find((perm) => perm.module === module);

  console.log("📌 Module Permissions:", modulePermissions); // Debugging log

  // ✅ Check if the required permission exists
  if (
    !modulePermissions ||
    (!modulePermissions.can_read && requiredPermission === "can_read") ||
    (!modulePermissions.can_write && requiredPermission === "can_write") ||
    (!modulePermissions.can_delete && requiredPermission === "can_delete")
  ) {
    return <p className="text-red-500">🚫 Access Denied</p>;
  }

  return children;
};

export default ProtectedComponent;
