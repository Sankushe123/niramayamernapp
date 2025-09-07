'use client';

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../widgets/Common/Navbar";
import { Calendar, Stethoscope, Syringe, CalendarDays } from "lucide-react";
import { useState } from "react";
import CalendarComponent from 'react-calendar';  // Importing react-calendar
import 'react-calendar/dist/Calendar.css';  // Import styles for calendar
import AppointmentPage from "./AppointmentPage"; // Import the AppointmentPage component
import { useSelector, useDispatch } from 'react-redux';
import { openAppointment, openConsultation } from '../../store/accessSlice'; // adjust path if needed
import Consultation from "./Consultation";


let contactNo = process.env.NEXT_EMERGENCY_CONTACT_NO;

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAppointment = useSelector((state) => state.appointment.isAppointmentOpen);
  const isConsultatiopn = useSelector((state) => state.consultation.isConsultationOpen);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());

  const holidays = [
    new Date(2025, 4, 3), // May 1st, 2025
    new Date(2025, 4, 15), // May 15th, 2025
    new Date(2025, 5, 25), // June 25th, 2025
    // Add more holidays here...
  ];

  const schedule = [
    { day: "Monday", morning: "9 AM - 12 PM", evening: "5 PM - 8 PM" },
    { day: "Tuesday", morning: "9 AM - 12 PM", evening: "5 PM - 8 PM" },
    { day: "Wednesday", morning: "9 AM - 1 PM", evening: "5 PM - 7 PM" },
    { day: "Thursday", morning: "9 AM - 12 PM", evening: "5 PM - 8 PM" },
    { day: "Friday", morning: "9 AM - 12 PM", evening: "5 PM - 8 PM" },
    { day: "Saturday", morning: "9 AM - 1 PM", evening: "5 PM - 7 PM" },
    { day: "Sunday", morning: "Closed", evening: "Closed" } // Example for a day off
  ];


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openConsultationModal = () => dispatch(openConsultation());
  const openAppointmentOpen = () => dispatch(openAppointment());

  const tileClassName = ({ date, view }) => {
    // Check if the date is a holiday
    if (holidays.some(holiday => holiday.getDate() === date.getDate() && holiday.getMonth() === date.getMonth())) {
      return 'holiday-green';  // Add this class to highlight holidays
    }
    return null;
  };

  return (
    <>
      <Head>
        {/* SEO Metadata */}
      </Head>

      <section
        className="w-full md:px-10 py-6 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/background3.webp')" }}
      >
        <Navbar />

        {/* Hero Main Content */}
        <div className="container mx-auto px-4 md:px-8 lg:flex lg:items-center lg:justify-between">
          {/* Left Side */}
          <div className="lg:w-2/5 text-center lg:text-left bg-opacity-70 p-6 rounded-lg">
            <span className="text-headtextColor font-semibold font-sans">
              Welcome to Niramaya Clinic
            </span>
            <h1 className="text-2xl md:text-4xl font-bold mt-1 text-gray-900 leading-snug">
              Expert Care for Women & Children
            </h1>
            <p className="mt-3 text-gray-700 text-sm md:text-base">
              Providing <Link href="/services/womens-health">comprehensive healthcare</Link> services
              with a focus on pediatric and women’s health. Trust our <Link href="/about">experienced team</Link> for your family’s well-being.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-3">

              <button
               className="px-4 py-2 rounded-md text-sm md:text-base globalBtn transition" onClick={openAppointmentOpen}>
                Schedule Your Visit Now
              </button>


              <button className="bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm md:text-base hover:bg-blue-100 transition" 
              onClick={openConsultationModal}>
                Online Consultation
              </button>

            </div>
          </div>

          {/* Right Image */}
          <div className="lg:mt-0 lg:w-2/5 flex justify-center z-30">
            <img
              src="/Images/illustrationnew.png"
              alt="Niramaya Clinic Healthcare Team providing expert care"
              width={400}
              height={400}
              priority="true"
              className="mt-20 relative top-5 max-w-xs md:max-w-sm lg:max-w-md"
            />
          </div>
        </div>

        {/* Services Cards Section */}
        <div className="container mx-auto px-6 md:px-12 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{ title: "Online Consultation", icon: <Stethoscope className="text-blue-600 w-10 h-10" />, bg: "bg-blue-100", onClick: openConsultationModal },
          { title: "Vaccination Services", icon: <Syringe className="text-green-600 w-10 h-10" />, bg: "bg-green-100" },
          { title: "Book Appointments", icon: <Calendar className="text-yellow-600 w-10 h-10" />, bg: "bg-yellow-100", onClick: openAppointmentOpen },
          { title: "Check Availability", icon: <CalendarDays className="text-blue-600 w-10 h-10" />, bg: "bg-blue-100", onClick: openModal }
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition transform hover:scale-105 cursor-pointer"
              onClick={service.onClick} // if onClick exists
            >
              <div className={`${service.bg} p-4 rounded-full mb-4`}>{service.icon}</div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 p-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-4xl p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-10 text-center text-blue-700">Doctor's Availability</h2>

            <div className="flex space-x-4">
              {/* Calendar */}
              <div className="flex-1">
                <CalendarComponent
                  onChange={setDate}
                  value={date}
                  tileClassName={tileClassName} // Highlight the holidays with green
                />
              </div>

              {/* Availability Table */}
              <div className="flex-1 -mt-5">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Day</th>
                      <th className="px-4 py-2">Morning</th>
                      <th className="px-4 py-2">Evening</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {schedule.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{item.day}</td>
                        <td className="px-4 py-2">{item.morning}</td>
                        <td className="px-4 py-2">{item.evening}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Page Modal */}
      {isAppointment && (
        <AppointmentPage />
      )}
      {isConsultatiopn && (
        <Consultation/>
      )}


    </>
  );
};

export default HeroSection;
