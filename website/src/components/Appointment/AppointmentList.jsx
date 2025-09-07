"use client"
import React, { useEffect,useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { format, addDays, subDays, addMonths, subMonths, isSameDay } from "date-fns";
import axios from "axios";
// const appointmentData = [
//     {
//         id: 46,
//         fullName: "Jhon",
//         mobileNumber: "853xxxxxxxx",
//         email: "Jhon@gmail.com",
//         message: "",
//         date: "2025-05-11",
//         time: "09:30:00",
//         created_at: "2025-05-02T17:16:09.000Z",
//         isOnline: 0,
//         doctorName: "Dr. Thomas",
//     },
//     {
//         id: 45,
//         fullName: "Hojo",
//         mobileNumber: "853xxxxxxxx",
//         email: "Hoijo@gmail.com",
//         message: "",
//         date: "2025-05-19",
//         time: "09:30:00",
//         created_at: "2025-05-02T17:13:27.000Z",
//         isOnline: 0,
//         doctorName: "Dr. Iron man",
//     },
// ];



export default function AppointmentList() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentData, setAppointmentData] = useState([]);


    useEffect(() => {
        axios.get('/api/v1/appoinement')
            .then((resp) => {
                console.log('resp', resp.data)
                setAppointmentData(resp.data)
            })
            .catch((err) => {
                console.log('error', err.message)
            })
    }, [])

    const handleDayChange = (direction) => {
        setCurrentDate((prevDate) =>
            direction === "next" ? addDays(prevDate, 1) : subDays(prevDate, 1)
        );
    };

    const handleMonthChange = (direction) => {
        setCurrentDate((prevDate) =>
            direction === "next" ? addMonths(prevDate, 1) : subMonths(prevDate, 1)
        );
    };

    const filteredAppointments = appointmentData.filter((appt) =>
        isSameDay(new Date(appt.date), currentDate)
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Appointment Grid */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Check Appointments</h2>
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl shadow">
                    <div className="flex gap-2">
                        <button
                            className="p-2 rounded-full border hover:bg-gray-200"
                            onClick={() => handleMonthChange("prev")}
                        >
                            <ChevronsLeft />
                        </button>
                        <button
                            className="p-2 rounded-full border hover:bg-gray-200"
                            onClick={() => handleDayChange("prev")}
                        >
                            <ChevronLeft />
                        </button>
                    </div>
                    <h3 className="text-lg font-medium">{format(currentDate, "EEEE, dd MMM yyyy")}</h3>
                    <div className="flex gap-2">
                        <button
                            className="p-2 rounded-full border hover:bg-gray-200"
                            onClick={() => handleDayChange("next")}
                        >
                            <ChevronRight />
                        </button>
                        <button
                            className="p-2 rounded-full border hover:bg-gray-200"
                            onClick={() => handleMonthChange("next")}
                        >
                            <ChevronsRight />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-3">
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appt) => (
                            <div
                                key={appt.id}
                                onClick={() => setSelectedAppointment(appt)}
                                className={`rounded-lg border p-3 text-sm cursor-pointer ${selectedAppointment?.id === appt.id ? "bg-blue-600 text-white border-blue-700" : "bg-blue-100 text-blue-900 border-blue-400"}`}
                            >
                                <div className="font-medium">{appt.time}</div>
                                <div className="text-xs">{appt.doctorName}</div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-5 text-center text-gray-400 border p-3 rounded-lg">
                            No Appointments for this date
                        </div>
                    )}
                </div>

                {/* <div className="flex justify-center gap-4 pt-4">
                    <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium">
                        Reschedule
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
                        Add New
                    </button>
                </div> */}
            </div>

            {/* Patient Details Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Patient Details:</h2>
                {selectedAppointment ? (
                    <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>Name:</strong> {selectedAppointment.fullName}</p>
                        <p><strong>Contact:</strong> {selectedAppointment.mobileNumber}</p>
                        <p><strong>Email:</strong> {selectedAppointment.email}</p>
                        <p><strong>Doctor:</strong> {selectedAppointment.doctorName}</p>
                        <p><strong>Date:</strong> {selectedAppointment.date}</p>
                        <p><strong>Time:</strong> {selectedAppointment.time}</p>
                        <p><strong>Online:</strong> {selectedAppointment.isOnline ? "Yes" : "No"}</p>
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm">Click an appointment to see details.</p>
                )}
            </div>
        </div>
    );
}
