'use client';
import React from 'react';
import Navbar from '@/components/widgets/Common/Navbar';
import AppointmentPage from '../AppointmentPage';
import { useSelector, useDispatch } from 'react-redux';
import { openAppointment } from '../../../store/accessSlice';

export default function Aboutus() {
  const dispatch = useDispatch();
  const isAppointment = useSelector(
    (state) => state.appointment.isAppointmentOpen
  );

  return (
    <div className="min-h-screen mt-2 bg-white text-gray-800 font-sans">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#0f1950] py-12 px-4 mt-2 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-[#DE409E]">
          About Niramaya Clinic
        </h1>
        <p className="text-gray-100 text-base md:text-lg max-w-2xl mx-auto">
          Compassionate care for every mother and child. A trusted place where
          health meets comfort and care.
        </p>
      </section>

      {/* WHO WE ARE */}
      <section className="py-12 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <img
          src="/images/doctorImg.png"
          alt="Clinic"
          className="rounded-xl shadow-md w-full max-w-md mx-auto"
        />

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#DE409E]">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            At{' '}
            <span className="font-semibold text-[#DE409E]">
              Niramaya Mother & Child Care Clinic
            </span>
            , we provide personalized and comprehensive healthcare for women and
            children.
            <br />
            <br />
            We are a one-stop destination for comprehensive healthcare for women,
            children, and newborns in Ravet, Punawale, Tathawade, Kiwale, and
            nearby areas.
            <br />
            <br />
            With a strong focus on maternal wellness, child development,
            infertility care, and advanced gynecology, we combine modern medicine
            with a warm, personalized approach.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-14 px-6 max-w-5xl mx-auto bg-[#0f1950] rounded-xl grid md:grid-cols-2 gap-10 items-center border">


        <div>
          <h3 className="text-xl font-semibold mb-2 text-[#DE409E]">
            Our Mission
          </h3>
          <p className="text-gray-50 text-sm mb-6">
            To deliver accessible, compassionate, and affordable healthcare to
            mothers and children in a warm, modern environment.
          </p>

          <h3 className="text-xl font-semibold mb-2 text-[#DE409E]">
            Our Vision
          </h3>
          <p className="text-gray-50 text-sm">
            To be the most trusted, family-friendly clinic for mothers and
            children in Ravet and surrounding areas, delivering world-class care
            with compassion and integrity.
          </p>
        </div>
        <img
          src="/images/missionimage.png"
          alt="Mission and Vision"
          className=" w-full max-h-80 object-cover"
        />
      </section>

      {/* DOCTORS */}
      <section className="py-14 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#DE409E] mb-14">
          Meet Our Doctors
        </h2>

        <div className="space-y-12">
          {[{ name: "Dr. Amol Thorat", img: "https://res.cloudinary.com/dzmndqvb2/image/upload/v1763485134/drAmol_ws2ogc.jpg", degree: "MBBS, DCH, DNB (Pediatrics & Neonatology)", experience: "12+ years of experience", description: "Dr. Amol Thorat is a highly experienced Pediatrician and Neonatologist with over a decade of dedicated service in child healthcare. He completed his MBBS from VM Government Medical College, Solapur, DCH from Mumbai, and DNB in Pediatrics from NBE, New Delhi.", specialties: ["Newborn and infant care", "Childhood illnesses", "Immunizations & growth monitoring", "Nutritional and developmental guidance",], research: "Dr. Thorat has also contributed to the field through research publications in reputed international journals, including the prestigious Frontiers Journal." }, { name: "Dr. Deepa Thorat", img: "https://res.cloudinary.com/dzmndqvb2/image/upload/v1763485125/drDeep1_zbmcfu.jpg", degree: "MBBS, MD (OBGYN), DNB, FRM, FMAS", experience: "8+ years of experience", description: "Dr. Deepa Thorat is an accomplished Obstetrician, Gynecologist, and Fertility Specialist. She completed her MBBS from GMC Aurangabad, MD (OBGY) from GMC Nagpur, and DNB from NBE, New Delhi. She also holds fellowships in Reproductive Medicine (FRM) and Minimal Access Surgery (FMAS).", specialties: ["High-risk pregnancy management", "Infertility treatment (IUI, IVF)", "PCOS & hormonal disorders", "Laparoscopic & hysteroscopic gynec surgeries", "Women’s wellness and preventive care",], research: "Dr. Thorat has authored several research articles published in respected international medical journals, reinforcing her knowledge and commitment to innovation in women’s health." }].map((doctor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 p-6 bg-[#f6f8f7] rounded-2xl shadow-md border"
            >
              <img
                src={doctor.img}
                alt={doctor.name}
                className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#DE409E] mx-auto md:mx-0"
              />

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600">{doctor.degree}</p>
                <p className="text-sm text-gray-600 mb-3">
                  {doctor.experience}
                </p>

                <p className="text-sm text-gray-700 mb-3">
                  {doctor.description}
                </p>

                <ul className="list-disc list-inside text-sm text-gray-700 mb-3 space-y-1">
                  {doctor.specialties.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <p className="text-sm text-gray-700">{doctor.research}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-14 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Your Health is Our Priority
        </h2>
        <p className="text-gray-600 mb-6">
          Experience expert care with doctors dedicated to your family’s
          well-being.
        </p>
        <button
          onClick={() => dispatch(openAppointment())}
          className="bg-[#DE409E] hover:bg-[#c9378d] text-white px-8 py-3 rounded-lg font-medium transition"
        >
          Book an Appointment
        </button>
      </section>

      {isAppointment && <AppointmentPage />}
    </div>
  );
}
