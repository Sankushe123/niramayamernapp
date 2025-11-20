"use client";
import React, { useEffect, useState } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameDay,
    isSameMonth,
} from "date-fns";
import axios from "axios";

export default function AppointmentList() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointmentData, setAppointmentData] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        axios
            .get("/api/appointments/get")
            .then((resp) => setAppointmentData(resp.data))
            .catch((err) => console.log("err", err));
    }, []);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = [];
    let day = calendarStart;

    while (day <= calendarEnd) {
        days.push(day);
        day = addDays(day, 1);
    }

    // appointment count per day
    const appointmentCount = (d) => {
        return appointmentData.filter((a) =>
            isSameDay(new Date(a.date), d)
        ).length;
    };

    const dayAppointments = selectedDay
        ? appointmentData.filter((a) => isSameDay(new Date(a.date), selectedDay))
        : [];

    return (
        <div className="w-full flex gap-5">

            <div className="w-2/3">
                {/* Calendar */}
                <div className="bg-white shadow rounded-lg p-2">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                        <button
                            onClick={() => setCurrentDate(addDays(currentDate, -30))}
                            className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
                        >
                            Prev
                        </button>

                        <h2 className="text-md font-semibold">
                            {format(currentDate, "MMMM yyyy")}
                        </h2>

                        <button
                            onClick={() => setCurrentDate(addDays(currentDate, 30))}
                            className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
                        >
                            Next
                        </button>
                    </div>

                    {/* Week Labels */}
                    <div className="grid grid-cols-7 text-center text-gray-600 text-xs font-medium mb-1">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                            <div key={d}>{d}</div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((d, idx) => {
                            const isCurrentMonth = isSameMonth(d, currentDate);
                            const count = appointmentCount(d);

                            return (
                                <div
                                    key={idx}
                                    className={`p-1 h-14 rounded-md flex flex-col items-center justify-between cursor-pointer transition 
                                ${isCurrentMonth ? "bg-gray-100" : "bg-gray-200 opacity-50"} 
                                ${selectedDay && isSameDay(d, selectedDay) ? "ring-2 ring-blue-500" : ""}
                                hover:bg-gray-300`}
                                    onClick={() => {
                                        setSelectedDay(d);
                                        setSelectedAppointment(null);
                                    }}
                                >
                                    <div className="text-xs font-medium">
                                        {format(d, "d")}
                                    </div>

                                    {/* Show count instead of dot */}
                                    {count > 0 && (
                                        <div className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
                                            {count}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Appointments Under Calendar */}
                <div className="bg-white shadow rounded-lg p-2 mt-5">
                    <h2 className="text-sm font-semibold mb-2">
                        Appointments{" "}
                        {selectedDay ? `(${format(selectedDay, "dd MMM")})` : ""}
                    </h2>

                    {dayAppointments.length === 0 ? (
                        <p className="text-gray-400 text-xs">No appointments for this day.</p>
                    ) : (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {dayAppointments.map((appt) => (
                                <div
                                    key={appt.id}
                                    onClick={() => setSelectedAppointment(appt)}
                                    className={`min-w-[110px] h-[90px] rounded-lg border cursor-pointer p-2 flex flex-col justify-center 
                                ${selectedAppointment?.id === appt.id
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-100 text-blue-900"
                                        }`}
                                >
                                    <div className="font-medium text-sm">{appt.time}</div>
                                    <div className="text-[10px]">{appt.doctorName}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Appointment Details */}
            <div className="w-1/3">
                <div className="bg-white shadow-md rounded-xl p-5 border border-gray-100">

                    {/* Header */}
                    <h2 className="text-base font-semibold mb-4 text-gray-800">
                        Appointment Details
                    </h2>

                    {selectedAppointment ? (
                        <div className="space-y-3 text-sm">

                            {/* Name */}
                            <div className="flex justify-between pb-2 border-b">
                                <span className="font-medium text-gray-600">Name</span>
                                <span className="font-semibold text-gray-900">
                                    {selectedAppointment.fullName}
                                </span>
                            </div>

                            {/* Email */}
                            <div className="flex justify-between pb-2 border-b">
                                <span className="font-medium text-gray-600">Email</span>
                                <span className="text-gray-900">{selectedAppointment.email}</span>
                            </div>

                            {/* Mobile */}
                            <div className="flex justify-between pb-2 border-b">
                                <span className="font-medium text-gray-600">Mobile</span>
                                <span className="text-gray-900">{selectedAppointment.mobileNumber}</span>
                            </div>

                            {/* Doctor */}
                            <div className="flex justify-between pb-2 border-b">
                                <span className="font-medium text-gray-600">Doctor</span>
                                <span className="font-semibold text-gray-900">
                                    {selectedAppointment.doctorName}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="flex justify-between pb-2 border-b">
                                <span className="font-medium text-gray-600">Date</span>
                                <span className="text-gray-900">{selectedAppointment.date}</span>
                            </div>

                            {/* Time */}
                            <div className="flex justify-between pb-2 border-b">
                                <span className="font-medium text-gray-600">Time</span>
                                <span className="text-gray-900">{selectedAppointment.time}</span>
                            </div>

                            {/* Online */}
                            <div className="flex justify-between pb-1">
                                <span className="font-medium text-gray-600">Online</span>
                                <span className={`font-semibold ${selectedAppointment.isOnline ? "text-green-600" : "text-red-600"}`}>
                                    {selectedAppointment.isOnline ? "Yes" : "No"}
                                </span>
                            </div>

                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm py-6 text-center">
                            Select an appointment to view details.
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}
