'use client';
import React from 'react';
import Navbar from '@/components/widgets/Common/Navbar';
import AppointmentPage from '../AppointmentPage';
import { useSelector, useDispatch } from 'react-redux';
import { openAppointment } from '../../../store/accessSlice';

export default function Aboutus() {
  const dispatch = useDispatch();
  const isAppointment = useSelector((state) => state.appointment.isAppointmentOpen);
  const openAppointmentOpen = () => dispatch(openAppointment());

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="mb-4 mt-3">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-3 text-[#DE409E]">About Niramaya Clinic</h1>
        <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto">
          Compassionate care for every mother and child. Our clinic is a trusted place where health meets care and comfort.
        </p>
      </section>

      {/* Info Section - Text Left, Image Right */}
      <section className="py-8 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <img
          src="/images/doctorImg.png"
          alt="Clinic"
          className="rounded-lg shadow-sm object-cover w-3/4 "
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#DE409E]">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed text-base">
            At <span className="font-semibold text-[#DE409E]">Niramaya Mother & Child Care Clinic</span>, we provide personalized and comprehensive healthcare for women and children. Our experienced team focuses on delivering trusted support throughout pregnancy, postnatal care, and child wellness.
            <br /><br />
            We are a one-stop destination for comprehensive healthcare for women, children, and newborns in Ravet, Punawale, Tathawade, Kiwale, and nearby areas. Our mission is to bring expert medical care with compassion, right to your neighborhood.
            <br /><br />
            With a strong focus on maternal wellness, child development, infertility care, and advanced gynecology, we combine modern medicine with a warm, personalized approach.
          </p>
        </div>


      </section>

      {/* Mission & Vision - Image Left, Text Right */}
      <section className="py-12 px-6 max-w-5xl mx-auto bg-[#F5F7F6] rounded-lg grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h3 className="text-xl font-semibold mb-2 text-[#DE409E]">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed text-sm mb-6">
            To deliver accessible, compassionate, and affordable healthcare to mothers and children in a warm, modern environment.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-[#DE409E]">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            To be the most trusted, family-friendly clinic for mothers and children in Ravet and surrounding areas, delivering world-class care with compassion and integrity.
          </p>
        </div>
        <img
          src="/images/mission-vision.jpg" // Replace with your actual mission-vision image
          alt="Mission and Vision"
          className="rounded-lg shadow-sm object-cover w-full max-h-80"
        />
      </section>
      {/* Our Doctors Section */}
      {/* Our Doctors Section */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#DE409E] mb-16">
            Meet Our Doctors
          </h2>

          <div className="grid gap-12">

            {/* Doctor Card */}
            {[{
              name: "Dr. Amol Thorat",
              img: "https://res.cloudinary.com/dzmndqvb2/image/upload/v1763485134/drAmol_ws2ogc.jpg",
              degree: "MBBS, DCH, DNB (Pediatrics & Neonatology)",
              experience: "12+ years of experience",
              description: "Dr. Amol Thorat is a highly experienced Pediatrician and Neonatologist with over a decade of dedicated service in child healthcare. He completed his MBBS from VM Government Medical College, Solapur, DCH from Mumbai, and DNB in Pediatrics from NBE, New Delhi.",
              specialties: [
                "Newborn and infant care",
                "Childhood illnesses",
                "Immunizations & growth monitoring",
                "Nutritional and developmental guidance",
              ],
              research: "Dr. Thorat has also contributed to the field through research publications in reputed international journals, including the prestigious Frontiers Journal."
            },
            {
              name: "Dr. Deepa Thorat",
              img: "https://res.cloudinary.com/dzmndqvb2/image/upload/v1763485125/drDeep1_zbmcfu.jpg",
              degree: "MBBS, MD (OBGYN), DNB, FRM, FMAS",
              experience: "8+ years of experience",
              description: "Dr. Deepa Thorat is an accomplished Obstetrician, Gynecologist, and Fertility Specialist. She completed her MBBS from GMC Aurangabad, MD (OBGY) from GMC Nagpur, and DNB from NBE, New Delhi. She also holds fellowships in Reproductive Medicine (FRM) and Minimal Access Surgery (FMAS).",
              specialties: [
                "High-risk pregnancy management",
                "Infertility treatment (IUI, IVF)",
                "PCOS & hormonal disorders",
                "Laparoscopic & hysteroscopic gynec surgeries",
                "Women’s wellness and preventive care",
              ],
              research: "Dr. Thorat has authored several research articles published in respected international medical journals, reinforcing her knowledge and commitment to innovation in women’s health."
            }].map((doctor, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start gap-6 p-6 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={doctor.img}
                  alt={doctor.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-[#DE409E] shadow-md"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{doctor.degree}</p>
                  <p className="text-sm text-gray-600 mb-3">{doctor.experience}</p>
                  <p className="text-sm text-gray-700 mb-3">{doctor.description}</p>

                  <p className="text-sm font-medium text-gray-800 mb-1">Specialties:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-3 space-y-1">
                    {doctor.specialties.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-700">{doctor.research}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>




      {/* Call to Action */}
      <section className="text-center py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Health is Our Priority</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Experience the best care with our expert doctors dedicated to your family’s well-being.
        </p>
        <button
          onClick={openAppointmentOpen}
          className="inline-block bg-[#DE409E] hover:bg-[#c9378d] text-white font-medium py-3 px-7 rounded-md transition"
        >
          Book an Appointment
        </button>
      </section>

      {isAppointment && <AppointmentPage />}
    </div>
  );
}
