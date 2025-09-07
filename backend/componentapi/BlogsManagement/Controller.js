const Blog = require('./Model');
const mongoose = require('mongoose');
const slugify = require('slugify');

exports.getBlogs = async (req, res) => {
  try {
    const { id, slug } = req.query;

    // Get blog by MongoDB _id
    if (id) {
      const blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      return res.status(200).json(blog);
    }

    // Get blog by slug
    if (slug) {
      const blog = await Blog.findOne({ slug });
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      return res.status(200).json(blog);
    }

    // Return all blogs
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json(blogs);

  } catch (error) {
    console.error("❌ Error fetching blog:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// exports.getBlogById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Get blog by MongoDB _id
//     if (id) {
//       const blog = await Blog.findById({slug:id});
//       if (!blog) return res.status(404).json({ message: "Blog not found" });
//       return res.status(200).json(blog);
//     }

//     // Get blog by slug
//     if (slug) {
//       const blog = await Blog.findOne({ slug });
//       if (!blog) return res.status(404).json({ message: "Blog not found" });
//       return res.status(200).json(blog);
//     }

//     // Return all blogs
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     return res.status(200).json(blogs);

//   } catch (error) {
//     console.error("❌ Error fetching blog:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


exports.getBlogByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    // Prepare possible _id value only if valid ObjectId
    const objectId = mongoose.Types.ObjectId.isValid(idOrSlug) ? idOrSlug : null;

    // Build the query condition with $or
    const queryCondition = objectId
      ? { $or: [{ _id: objectId }, { slug: idOrSlug }] }
      : { slug: idOrSlug };

    const blog = await Blog.findOne(queryCondition);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);

  } catch (error) {
    console.error("❌ Error fetching blog:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const {
      blogTitle,
      blogContent,
      blogCategory,
      blogSubcategory,
      blogCatID,
      blogSubCatID,
      imagesArray = []
    } = req.body;

    const slug = slugify(blogTitle, { lower: true, strict: true });

    // Check for slug uniqueness
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Blog with this title already exists" });
    }

    const newBlog = new Blog({
      _id: new mongoose.Types.ObjectId(),
      blogTitle,
      slug,
      blogContent,
      blogCategory,
      blogSubcategory,
      blogCatID,
      blogSubCatID,
      imagesArray,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);

  } catch (error) {
    console.error("❌ Error creating blog:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      blogTitle,
      blogContent,
      blogCategory,
      blogSubcategory,
      blogCatID,
      blogSubCatID,
      imagesArray,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing Blog ID" });
    }

    if (!blogTitle || !blogContent) {
      return res.status(400).json({ message: "Blog title and content are required" });
    }

    const slug = slugify(blogTitle, { lower: true, strict: true });

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        blogTitle,
        slug,
        blogContent,
        blogCategory,
        blogSubcategory,
        blogCatID,
        blogSubCatID,
        imagesArray,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("❌ Error updating blog:", error);
    res.status(500).json({ message: "Failed to update blog" });
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params; // Using URL param for slug

    if (!id) {
      return res.status(400).json({ message: "Missing ID" });
    }

    const deleted = await Blog.findOneAndDelete({_id:id});

    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });

  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};
