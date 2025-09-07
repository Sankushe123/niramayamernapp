
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ServicesDropdown from "./menuDate";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { openAppointment, closeAppointment } from '../../../store/accessSlice'; // adjust path if needed


const Navbar = () => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [servicesMenu,setServicesMenu] = useState([])
  const [showServices, setShowServices] = useState(false);

  const isAppointment = useSelector((state) => state.appointment.isAppointmentOpen);
  const dispatch = useDispatch();

  useEffect(()=>{
    fetchCategories();
  },[])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/subcategory/menu');
      console.log(res);
      
      setServicesMenu(res.data);
    } catch (error) {
      Swal.fire('Error!', `Failed to fetch categories.${error.message}`, 'error');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowServices(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <nav className="w-full">
      <div className="container mx-auto px-6 md:px-14 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center">
          <img src="/Images/niramayalogo.png" alt="Logo" className="h-9 mr-2" />
        </Link>
        

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-600 items-center relative">
          <Link href="/mother-child-care" className="hover:text-blue-500">Home</Link>
          <Link href="/mother-child-care/about-us" className="hover:text-blue-500">About Us</Link>

          <div
            ref={dropdownRef}
            className="relative"
            onClick={() => { setShowServices(!showServices) }}
          >
            <button className="hover:text-blue-500 flex items-center gap-1">
              Services
              <svg
                className="w-4 h-4 transform transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* <Link href="/doctors" className="hover:text-blue-500">Doctors</Link> */}
          <Link href="/mother-child-care/blogs" className="hover:text-blue-500">Blogs</Link>
          {/* <Link href="/mother-child-care/contact-us" className="hover:text-blue-500">Contact Us</Link> */}
        </div>



        {/* Book Appointment Button */}
        <button onClick={()=>{dispatch(openAppointment())}} className="hidden md:block globalBtn px-4 py-2">
          Book Appointment
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-3 bg-white px-6 py-4 shadow-lg">
          <Link href="/" className="hover:text-blue-500">Home</Link>

          {/* Expandable Services Dropdown for Mobile */}
          <div
            className="relative group"
            onClick={() => setShowServices(true)}

          >
            <button
              className="hover:text-blue-500 flex items-center gap-1"
              onClick={() => setShowServices(prev => !prev)}
            >
              Services
              <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>


          </div>


          {/* <Link href="/doctors" className="hover:text-blue-500">Doctors</Link> */}
          <Link href="/mother-child-care/about-us" className="hover:text-blue-500">About Us</Link>
          <Link href="/mother-child-care/blogs" className="hover:text-blue-500">Blog</Link>
          {/* <Link href="/mother-child-care/contact-us" className="hover:text-blue-500">Contact</Link> */}



          <Link href="/book-appointment" className="px-4 py-2 globalBtn">
            Book Appointment
          </Link>
        </div>
      )}



      <div className="absolute left-1/2 transform -translate-x-1/2 w-5/6 z-50" ref={dropdownRef}>
        <ServicesDropdown
          showServices={showServices}
          setShowServices={setShowServices}
          servicesMenu={servicesMenu}
        />
      </div>

    </nav>



  );
};

export default Navbar;

