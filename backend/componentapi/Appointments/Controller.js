const mongoose = require('mongoose');
const Appointment = require('./Model');
const sendEmail = require('../../Utils/sendEmail.js');

const User = require('../UserManagement/Model.js')

function formatDateToYYYYMMDD(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

exports.createAppointment = async (req, res) => {
    try {
        const { fullName, mobileNumber, email, message, date, time, isOnline, doctorName } = req.body;

        // ✅ Validate required fields
        if (!fullName || !mobileNumber || !email || !date || !time || !doctorName) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // ✅ Create appointment
        const appointmentDate = new Date(date);
        const appointment = new Appointment({
            _id: new mongoose.Types.ObjectId(),
            fullName,
            mobileNumber,
            email,
            message: message || "",
            date: appointmentDate,
            time,
            isOnline: isOnline ?? false,
            doctorName
        });

        const savedAppointment = await appointment.save();

        // ✅ Check if user already exists
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                first_name: fullName.split(' ')[0] || fullName,
                last_name: fullName.split(' ')[1] || '',
                phone_number: mobileNumber,
                email,
                password: 'defaultPassword123', // 🔹 Ideally hash a random password or prompt reset
                role: 'user'
            });
            await user.save();
        }

        // ✅ Prepare email details
        const formattedDate = appointmentDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        const userDetails = {
            fullName,
            mobileNumber,
            email,
            message,
            formattedDate,
            time,
            isOnline,
            doctorName
        };

        // ✅ Send confirmation email
        await sendEmail({
            to: email,
            subject: "Appointment Confirmation - Niramaya Mother and Child Care",
            purpose: "Appointment",
            userDetails
        });

        // ✅ Respond success
        res.status(201).json({
            message: "Appointment created successfully",
            appointmentId: savedAppointment._id
        });

    } catch (error) {
        console.error("❌ Error creating appointment:", error);
        res.status(500).json({ message: "Failed to create appointment" });
    }
};

// Other controller methods...
exports.getAppointments = async (req, res) => {
    try {
        const { id } = req.query;

        if (id) {
            const appointment = await Appointment.findById(id);
            if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

            return res.status(200).json({
                ...appointment.toObject(),
                date: formatDateToYYYYMMDD(appointment.date)
            });
        }

        const appointments = await Appointment.find().sort({ created_at: -1 });
        const formattedAppointments = appointments.map(appt => ({
            ...appt.toObject(),
            date: formatDateToYYYYMMDD(appt.date)
        }));

        res.status(200).json(formattedAppointments);

    } catch (error) {
        console.error('❌ Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: "Missing 'id' parameter" });

        const { fullName, mobileNumber, email, message, date, time, isOnline, doctorName } = req.body;
        if (!fullName || !mobileNumber || !email || !date || !time || !doctorName) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const appointmentDate = new Date(date);

        const updated = await Appointment.findByIdAndUpdate(
            id,
            { fullName, mobileNumber, email, message: message || '', date: appointmentDate, time, isOnline: isOnline ?? false, doctorName },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: 'Appointment not found' });

        res.status(200).json({ message: 'Appointment updated successfully' });

    } catch (error) {
        console.error('❌ Error updating appointment:', error);
        res.status(500).json({ message: 'Failed to update appointment' });
    }
};

// Delete
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.query;

        if (id) {
            const deleted = await Appointment.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ message: 'Appointment not found' });
            return res.status(200).json({ message: 'Appointment deleted successfully' });
        }

        await Appointment.deleteMany({});
        res.status(200).json({ message: 'All appointments deleted successfully' });

    } catch (error) {
        console.error('❌ Error deleting appointment(s):', error);
        res.status(500).json({ message: 'Failed to delete appointment(s)' });
    }
};

// Available times
exports.getAvailableTimesGroupedByDate = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const appointments = await Appointment.find({ date: { $gte: today } }).sort({ created_at: -1 });
        const result = {};

        appointments.forEach(appt => {
            const dateStr = formatDateToYYYYMMDD(appt.date);
            const timeStr = appt.time ? appt.time.slice(0, 5) : '';
            if (!result[dateStr]) result[dateStr] = [];
            if (timeStr) result[dateStr].push(timeStr);
        });

        res.status(200).json(result);

    } catch (error) {
        console.error("❌ Error fetching appointments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
