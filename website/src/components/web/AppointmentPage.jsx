import React, { useEffect, useState } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { openAppointment, closeAppointment } from '../../store/accessSlice'; // adjust path if needed
import axios from "axios";
import Swal from "sweetalert2";

const AppointmentPage = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        doctorName: '',
        email: '',
        message: '',
        date: new Date(),
        time: '',
        isOnline: false, // Default to online
    });
    const [loading, setLoading] = useState(false);
    const [unavailableSlotsByDate, setUnavailableSlotsByDate] = useState([]);

    const doctorsNames = [
        "Dr. Deepa Thorat",
        "Dr. Amol Thorat"
    ];

    const schedule = {
        Monday: [['09:00', '14:00'], ['17:00', '21:00']],
        Tuesday: [['09:00', '14:00'], ['17:00', '21:00']],
        Wednesday: [['Closed']],
        Thursday: [['17:00', '21:00']],
        Friday: [['09:00', '14:00'], ['17:00', '21:00']],
        Saturday: [['09:00', '14:00'], ['17:00', '21:00']],
        Sunday: [['09:00', '14:00'], ['17:00', '21:00']],
    };

    useEffect(() => {
        axios.get('/api/appointments/available-times')
            .then((resp) => {
                console.log('resp', resp.data)
                setUnavailableSlotsByDate(resp.data)
            })
            .catch((err) => {
                console.log('error', err.message)
            })
    }, [])


    const isAppointment = useSelector((state) => state.appointment.isAppointmentOpen);
    const dispatch = useDispatch();

    // Generate time slots based on start and end times
    const generateTimeSlots = (startTime, endTime) => {
        const slots = [];
        let currentTime = new Date(0, 0, 0, ...startTime.split(':'));
        const end = new Date(0, 0, 0, ...endTime.split(':'));

        while (currentTime <= end) {
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            slots.push(`${hours}:${minutes}`);
            currentTime = new Date(currentTime.getTime() + 15 * 60 * 1000); // 15 minutes interval
        }
        return slots;
    };

    // Get day name based on selected date
    const getDayName = (date) => date.toLocaleDateString('en-US', { weekday: 'long' });

    // Get available time slots for the selected date
    const getAvailableTimeSlots = (date) => {
        const dayName = getDayName(date);
        const daySchedule = schedule[dayName];

        if (!daySchedule || daySchedule[0][0] === 'Closed') return [];

        let availableSlots = [];
        daySchedule.forEach(([start, end]) => {
            availableSlots = [...availableSlots, ...generateTimeSlots(start, end)];
        });

        return availableSlots;
    };

    // Handle date change
    const handleDateChange = (date) => {
        console.log('date', date)
        setFormData({ ...formData, date });
    };

    // Handle time selection
    const handleTimeSelect = (time) => {
        setFormData({ ...formData, time });
    };

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle mode of appointment change (radio button)

    // const handleModeChange = (e) => {
    //     setFormData({ ...formData, appointmentMode: e.target.value });
    // };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const appointmentData = {
            ...formData,
            date: formData.date.toISOString(),
        };
        console.log('appointmentData', appointmentData);


        setLoading(true); // Start loading
        try {
            const res = await axios.post("/api/appointments/post", appointmentData);

            if (res.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Appointment Created",
                    text: "Your appointment has been successfully submitted.",
                    confirmButtonColor: "#3085d6",
                });
                dispatch(closeAppointment());
            }
        } catch (error) {
            console.error("❌ Error submitting appointment:", error);

            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while submitting the appointment.",
                confirmButtonColor: "#d33",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };


    // Check if a slot is available
    const isSlotAvailable = (date, time) => {

        // console.log('date, time', date, time);

        let dateObj;

        if (typeof date === 'string') {
            // Safely parse string date like '2025-05-09' in local time
            const [year, month, day] = date.split('-');
            dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        } else {
            dateObj = date;
        }

        const dateKey = dateObj.toLocaleDateString('en-CA'); // 'YYYY-MM-DD'
        const unavailableTimes = unavailableSlotsByDate[dateKey] || [];

        return !unavailableTimes.includes(time);
    };



    const availableSlots = getAvailableTimeSlots(formData.date);

    return (
        isAppointment && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg w-4/5 max-w-8xl relative max-h-[80vh] overflow-y-auto">
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        onClick={() => { dispatch(closeAppointment()) }}
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Book Appointment</h2>

                    <div className="flex space-x-4">
                        {/* Left Part: Online Consultation Message */}
                        <div className="w-2/6 p-4 border-r border-gray-300">
                            <p className="text-sm text-gray-600">
                                Please fill in your details below, and we'll get in touch with you for an online consultation.
                            </p>
                        </div>

                        {/* Right Part: Form */}
                        <div className="w-4/6 p-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full h-9 px-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full h-9 px-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full h-9 px-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">Doctor</label>
                                    <select
                                        name="doctorName"
                                        value={formData.doctorName}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                doctorName: e.target.value,
                                            }))
                                        }}
                                        required
                                        className="w-full h-9 px-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Doctor</option>
                                        {doctorsNames.map((role, index) => (
                                            <option key={index} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </div>



                                {/* Date Picker */}
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-semibold">Select Date</label>
                                        <CalendarComponent
                                            onChange={handleDateChange}
                                            value={formData.date}
                                            className="rounded-md shadow w-full mt-1"
                                        />
                                    </div>

                                    {/* Time Slot Picker */}
                                    <div className="w-1/2">
                                        <label className="block text-sm font-semibold">Select Time Slot</label>
                                        {/* <div className="h-72 overflow-y-auto grid grid-cols-2 gap-2 mb-4 pr-2 w-full">
                                            {availableSlots.length > 0 ? (
                                                availableSlots.map((time, index) => {
                                                    const available = isSlotAvailable(formData.date, time);
                                                    return (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            onClick={() => available && handleTimeSelect(time)}
                                                            disabled={!available}
                                                            className={`p-2 border rounded-md text-center flex items-center justify-center gap-2 ${formData.time === time
                                                                ? 'bg-blue-600 text-white'
                                                                : available
                                                                    ? 'bg-gray-100 hover:bg-gray-200'
                                                                    : 'bg-red-100 cursor-not-allowed'
                                                                }`}
                                                        >
                                                            {time}
                                                            {!available && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-red-500"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9-1V7a1 1 0 112 0v2a1 1 0 11-2 0zm0 4a1 1 0 112 0 1 1 0 11-2 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-sm text-gray-500">No slots available.</p>
                                            )}
                                        </div> */}
                                        <div className="h-72 mt-1 overflow-y-auto grid grid-cols-2 gap-2 mb-4 pr-2 w-full">
                                            {availableSlots.length > 0 ? (
                                                availableSlots.map((time, index) => {
                                                    // 👇 Safely parse the date string in local timezone
                                                    let dateObj;
                                                    if (typeof formData.date === 'string') {
                                                        const [year, month, day] = formData.date.split('-');
                                                        dateObj = new Date(Number(year), Number(month) - 1, Number(day));
                                                    } else {
                                                        dateObj = formData.date;
                                                    }

                                                    const available = isSlotAvailable(dateObj, time);

                                                    return (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            onClick={() => available && handleTimeSelect(time)}
                                                            disabled={!available}
                                                            className={`p-2 border rounded-md text-center flex items-center justify-center gap-2 ${formData.time === time
                                                                ? 'bg-blue-600 text-white'
                                                                : available
                                                                    ? 'bg-gray-100 hover:bg-gray-200'
                                                                    : 'bg-red-100 cursor-not-allowed'
                                                                }`}
                                                        >
                                                            {time}
                                                            {!available && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-red-500"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9-1V7a1 1 0 112 0v2a1 1 0 11-2 0zm0 4a1 1 0 112 0 1 1 0 11-2 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-sm text-gray-500">No slots available.</p>
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Message <span className="text-gray-500 text-xs">(optional)</span>
                                    </label>

                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}

                                        className="w-full  p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Mode of Appointment Radio Buttons */}
                                {/* <div>
                                    <label className="block text-sm font-semibold">Mode of Appointment</label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="appointmentMode"
                                                value="online"
                                                checked={formData.appointmentMode === 'online'}
                                                onChange={handleModeChange}
                                                className="text-blue-600 focus:ring-0 focus:ring-blue-0 focus:outline-none"
                                            />
                                            <span>Online Consultation</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="appointmentMode"
                                                value="inClinic"
                                                checked={formData.appointmentMode === 'inClinic'}
                                                onChange={handleModeChange}
                                                className="text-blue-600 focus:ring-0 focus:ring-blue-0 focus:outline-none"
                                            />
                                            <span>In-Clinic Appointment</span>
                                        </label>
                                    </div>
                                </div> */}


                                <div className="pt-2 mt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3 mt-5 rounded-md transition 
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default AppointmentPage;
