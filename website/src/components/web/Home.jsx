// 'use client';

// import React, { useState, useEffect } from 'react';
// import SubHeader from '../widgets/Common/SubHeader';
// import Navbar from '../widgets/Common/Navbar';
// import HeroSection from './HeroScection';
// import ServicesSection from './ServicesSection';
// import BlogSection from './BlogsSection';
// import PatientReviews from './PatientReviews';
// import Footer from './Footer';
// import Contactus from './Contactus';
// import Doctorsinfo from './Doctorsinfo';
// import Adspage from '../widgets/Common/Adspage';
// import { useSelector, useDispatch } from 'react-redux';
// import { openAppointment, closeAppointment } from '../../store/accessSlice';
// import axios from 'axios';

// const Home = () => {
//   const [showAd, setShowAd] = useState(true);
//   const isAppointment = useSelector((state) => state.appointment.isAppointmentOpen);
//   const dispatch = useDispatch();


//   const [isMounted, setIsMounted] = useState(false); // ensure client-side only

//   useEffect(() => {
//     setIsMounted(true);

//     axios
//       .get('/api/banner/check-Active')
//       .then((resp) => {
//         if (resp.data?.active && resp.data?.banner) {

//           const hasSeenAd = localStorage.getItem('hasSeenAd');
//           if (!hasSeenAd) {
//             setShowAd(true);
//             localStorage.setItem('hasSeenAd', 'true');
//           }
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching active banner:', err);
//       });
//   }, []);

//   useEffect(() => {
//     if (!isMounted) return;

//     const hasSeenAd = localStorage.getItem('hasSeenAd');

//     if (!hasSeenAd) {
//       setShowAd(true);
//       localStorage.setItem('hasSeenAd', 'true');
//     }
//   }, [isMounted]);

//   useEffect(() => {
//     if (showAd) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [showAd]);



//   return (
//     <div className="">

//       {showAd && (
//         <div className="fixed top-0 left-0 w-full h-full z-50">
//           <Adspage showAd={showAd} setShowAd={setShowAd} />
//         </div>
//       )}

//       <HeroSection />
//       <ServicesSection />

//       <div className="relative h-auto min-h-[15rem] w-full flex flex-col items-center justify-center text-white p-6 sm:p-8 md:p-10 overflow-hidden text-center">
//         {/* Animated Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-600 to-teal-500 animate-gradient z-0"></div>

//         {/* Content */}
//         <h2 className="max-w-4xl text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-sans relative z-10">
//           <span className="text-headtextColor text-2xl sm:text-3xl md:text-4xl font-serif">"</span>
//           Health is the greatest wealth. Take care of your body, it's the only place you have to live.
//           <span className="text-headtextColor text-2xl sm:text-3xl md:text-4xl font-serif">"</span>
//         </h2>

//         <button
//           onClick={() => dispatch(openAppointment())}
//           className="mt-6 bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition relative z-10"
//         >
//           Book Appointment
//         </button>

//         {/* Custom Styles */}
//         <style jsx>{`
//     @keyframes gradientAnimation {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     .animate-gradient {
//       background-size: 200% 200%;
//       animation: gradientAnimation 6s ease infinite;
//     }
//   `}</style>
//       </div>

//       <Doctorsinfo />
//       <BlogSection />
//       <PatientReviews />
//       <Contactus />
//       {/* <Footer /> */}


//     </div>
//   );
// };

// export default Home;
'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from './HeroScection';
import ServicesSection from './ServicesSection';
import BlogSection from './BlogsSection';
import PatientReviews from './PatientReviews';
import Contactus from './Contactus';
import Doctorsinfo from './Doctorsinfo';
import Adspage from '../widgets/Common/Adspage';
import { useSelector, useDispatch } from 'react-redux';
import { openAppointment } from '../../store/accessSlice';
import axios from 'axios';
import { BiSolidQuoteRight } from "react-icons/bi";
import { BiSolidQuoteLeft } from "react-icons/bi";
const Home = () => {
  const [showAd, setShowAd] = useState(false); // ✅ default false
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/api/banner/check-Active')
      .then((resp) => {

        // console.log('resp', resp);

        if (resp.data?.active) {

          setShowAd(true);

        } else {
          setShowAd(false); // no active banner
        }
      })
      .catch((err) => {
        console.error('Error fetching active banner:', err);
        setShowAd(false);
      });
  }, []);

  // Lock scroll only when Ad is showing
  useEffect(() => {
    if (showAd) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAd]);

  // console.log('showAd', showAd);


  return (
    <div className="">
      {/* Banner Ad */}
      {showAd && (
        <div className="fixed top-0 left-0 w-full h-full z-50">
          <Adspage showAd={showAd} setShowAd={setShowAd} />
        </div>
      )}

      {/* Hero Section */}
      <HeroSection />
      <ServicesSection />

      {/* Quote Section */}
      <div className="relative h-auto min-h-[15rem] w-full flex flex-col items-center justify-center text-white p-6 sm:p-8 md:p-10 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-600 to-teal-500 animate-gradient z-0"></div>

        <h2 className="max-w-5xl text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-sans relative z-10">
          {/* <span className="text-white text-2xl sm:text-3xl md:text-4xl font-serif">" </span> */}
          At our Clinic, your health comes first — with trusted care designed to heal, comfort, and uplift you and your family
          {/* <span className="text-white text-2xl sm:text-3xl md:text-4xl font-serif"> "</span> */}
        </h2>

        <button
          onClick={() => dispatch(openAppointment())}
          className="mt-6 bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition relative z-10"
        >
          Book Appointment
        </button>

        <style jsx>{`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientAnimation 6s ease infinite;
          }
        `}</style>
      </div>

      {/* Other Sections */}
      <Doctorsinfo />
      <BlogSection />
      {/* Quote Section */}
      <div className="relative h-auto min-h-[15rem] w-full flex flex-col items-center justify-center text-white p-6 sm:p-8 md:p-10 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-600 to-teal-500 animate-gradient z-0"></div>

        <h2 className="max-w-5xl text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-sans relative z-10">
          {/* <span className="text-white text-2xl sm:text-3xl md:text-4xl font-serif">" </span> */}
          To deliver compassionate, reliable, and expert care that supports every woman, every child, and every family.
          {/* <span className="text-white text-2xl sm:text-3xl md:text-4xl font-serif"> "</span> */}
        </h2>

        <button
          onClick={() => dispatch(openAppointment())}
          className="mt-6 bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition relative z-10"
        >
          Book Appointment
        </button>

        <style jsx>{`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientAnimation 6s ease infinite;
          }
        `}</style>
      </div>
      <PatientReviews />
      <Contactus />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
