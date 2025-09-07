const mongoose = require("mongoose");
const User = require('./Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../../Utils/sendEmailInqueiry');

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// In-memory OTP store (for demo only, consider Redis or DB for prod)
const otpStore = new Map();


exports.createUser = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashedPassword,
      ...rest
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Create User Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getEditUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    let updatedData = { ...rest };

    // If password is provided, hash it
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true }).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getDeleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};




exports.register = async (req, res) => {
  try {
    const {
      first_name, last_name, phone_number, additional_number, email,
      gender, address, city, password, aadhar_no, aadhar_image, role
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      first_name,
      last_name,
      phone_number,
      additional_number,
      email,
      gender,
      address,
      city,
      password: hashedPassword,
      aadhar_no,
      aadhar_image: aadhar_image ? JSON.stringify(aadhar_image) : null,
      role
    });

    const savedUser = await user.save();

    res.status(201).json({
      id: savedUser._id,
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      email: savedUser.email
    });

  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Login successful", token, user });

  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    await sendEmail(email, `Your OTP Code is: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const stored = otpStore.get(email);
    if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    otpStore.delete(email);

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};


exports.createDefaultAdmin = async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(200).json({ message: "Admin user already exists" });
    }

    // Hash default password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Prepare admin data
    const defaultAdmin = new User({
      _id: new mongoose.Types.ObjectId(),
      first_name: "Admin",
      last_name: "User",
      phone_number: "9999999999",
      additional_number: null,
      email: "admin@example.com",
      gender: "Other",
      address: "Startup Lane",
      city: "System",
      password: hashedPassword,
      aadhar_no: "000000000000",
      aadhar_image: null,
      role: "admin",
    });

    const savedAdmin = await defaultAdmin.save();

    return res.status(201).json({
      message: "Admin user created successfully",
      user: { id: savedAdmin._id, email: savedAdmin.email }
    });

  } catch (error) {
    console.error("❌ Startup Admin Error:", error);
    return res.status(500).json({ message: "Failed to create admin user" });
  }
};

exports.cantactUs = async (req, res) => {
  try {

    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required.' }),
        { status: 400 }
      );
    }

    const result = await sendEmail({ name, email, phone, message });

    console.log("result", result);


    if (!result.success) {
      return res.status(500).json({
        message: "Failed to send emails",
      });
    } else {
      return res.status(200).json({
        message: "Message sent successfully",
      });
    }
  } catch (error) {
    console.error('API POST error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
