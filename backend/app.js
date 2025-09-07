const express = require('express');
const cors = require('cors');
require('dotenv').config();

const roleaccessRoutes = require('./componentapi/AccessApi/Routes');
const appointmentRoutes = require("./componentapi/Appointments/routes");
const userRoutes = require("./componentapi/UserManagement/Routes");
const blogsRoutes = require("./componentapi/BlogsManagement/Routes");
const faqRoutes = require("./componentapi/FaqManagement/Routes");
const reviewRoutes = require("./componentapi/ReviewsManagement/Routes");
const subCatInfoRoutes = require("./componentapi/SubCatInfo/Routes");
const categoryRoutes = require("./componentapi/Category/Routes");
const subcategoryRoutes = require("./componentapi/Subcategory/Routes");
const bannerRoutes = require("./componentapi/bannerMgm/routes")
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ API is running!');
});

app.use('/api/roleaccess', roleaccessRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/subcatinfo", subCatInfoRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/banner", bannerRoutes);

module.exports = app;
