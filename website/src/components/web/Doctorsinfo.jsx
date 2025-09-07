import Image from "next/image";
// import { Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
const doctors = JSON.parse(process.env.NEXT_doctorsInfo || "[]");

const Doctorsinfo = () => {
    return (
        // <section className="w-full py-12">
        //     <div className="w-full flex justify-center">
        //         <h2 className="text-2xl font-bold text-center mb-8">Our Expert Doctors</h2>
        //     </div>
        //     <div className="block md:flex flex-wrap justify-center gap-16 p-8">
        //         {doctors.map((doctor, index) => (
        //             <div
        //                 key={index}
        //                 className="bg-blue-50 w-1/3 rounded-lg shadow-md  p-6 text-center relative"
        //             >
        //                 {/* Doctor Image with Social Icon */}
        //                 <div className="relative w-36 h-36 -top-16 mx-auto rounded-full border overflow-hidden ">
        //                     <Image src={doctor.image} alt={doctor.name} width={96} height={96} />
        //                 </div>

        //                 {/* Doctor Name & Info */}
        //                 <h3 className="mt-0 text-lg font-semibold">{doctor.name}</h3>
        //                 <p className="text-gray-600 text-sm">{doctor.specialty}</p>
        //                 <p className="text-gray-500 text-sm mt-2">{doctor.description}</p>

        //                 {/* Button */}
        //                 {/* <button className="mt-6 px-4 py-2 globalBtn ">
        //                     More Details
        //                 </button> */}
        //             </div>
        //         ))}
        //     </div>
        // </section >
        <section className="w-full py-12">
            <div className="w-full flex justify-center">
                <h2 className="text-2xl font-bold text-center mb-8">Our Expert Doctors</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 md:px-8">
                {doctors.map((doctor, index) => (
                    <div
                        key={index}
                        className="bg-blue-50 w-full sm:w-[45%] md:w-[30%] lg:w-[32%] rounded-lg shadow-md pt-12 pb-6 px-4 text-center relative"
                    >
                        {/* Doctor Image */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full border overflow-hidden -mt-16 shadow-md">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                width={144}
                                height={144}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Doctor Info */}
                        <div>
                            <h3 className="mt-3 text-lg font-semibold">{doctor.name}</h3>
                            <p className="text-gray-600 text-sm">{`(${doctor.degree})`}</p>
                            <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                            <p className="text-gray-500 text-sm mt-4 mb-4">{doctor.description}</p>
                        </div>

                        <Link href="/mother-child-care/about-us">
                            <button className="bg-[#DE409E] text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition">
                                Learn More
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

        </section>

    );
};

export default Doctorsinfo;
