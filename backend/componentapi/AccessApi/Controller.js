const RoleAccess = require('./model');

// GET /api/roleaccess?role=Admin
const getAccessByRole = async (req, res) => {
  try {
    const { role } = req.params;

    if (!role) {
      return res.status(400).json({ message: "Missing 'role' parameter" });
    }

    const accessRecords = await RoleAccess.find({ role });
    return res.status(200).json(accessRecords);

  } catch (error) {
    console.error("❌ Error fetching access records:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /api/roleaccess
const createAccessRecords = async (req, res) => {
  try {
    const { role, modules } = req.body;

    if (!role || !modules) {
      return res.status(400).json({ message: "Missing role or modules" });
    }

    await RoleAccess.deleteMany({ role });

    const recordsToInsert = Object.entries(modules).map(([moduleName, perms]) => {
      const { read = false, write = false, delete: del = false, all = false } = perms;

      return {
        role,
        module: moduleName,
        can_read: read,
        can_write: write,
        can_delete: del,
        can_all: all
      };
    });

    const created = await RoleAccess.insertMany(recordsToInsert);

    return res.status(201).json({
      message: "Access records created",
      records: created
    });

  } catch (error) {
    console.error("❌ Error creating access records:", error);
    return res.status(500).json({ message: "Failed to create access records" });
  }
};

module.exports = {
  getAccessByRole,
  createAccessRecords
};
