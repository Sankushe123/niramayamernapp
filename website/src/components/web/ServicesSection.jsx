// import Image from 'next/image';
// import { Stethoscope, Syringe,ChevronRight , ArrowUpRight , HeartPulse, Baby, Activity,ShieldCheck,FileHeart ,ScanEye , BrainCircuit, CalendarHeart, HeartHandshake } from "lucide-react";

// const services = {
//     pediatric: [
//         { icon: <Baby />, title: "Newborn Care", desc: "Comprehensive care for your newborn" },
//         { icon: <Syringe />, title: "Vaccinations", desc: "Complete immunization programs" },
//         { icon: <Activity />, title: "Developmental Screening", desc: "Monitor child growth and development" },
//         { icon: <BrainCircuit />, title: "Behavioral Assessment", desc: "Child behavior and development evaluation" },
//         { icon: <Stethoscope />, title: "Pediatric Treatment", desc: "Treatment for childhood illnesses" },
//         { icon: <CalendarHeart />, title: "Child Health Check", desc: "Regular health monitoring" },
//         { icon: <HeartPulse />, title: "Growth Monitoring", desc: "Track physical development" },
//         { icon: <HeartHandshake />, title: "Emergency Care", desc: "24/7 emergency pediatric services" }
//     ],
//     gynecology: [
//         { icon: <ShieldCheck />, title: "Gynecological Exams", desc: "Comprehensive women's health exams" },
//         { icon: <HeartPulse />, title: "Fertility Treatment", desc: "Advanced fertility solutions" },
//         { icon: <FileHeart />, title: "Menopause Care", desc: "Management of menopausal symptoms" },
//         { icon: <ScanEye />, title: "Women's Health", desc: "General women's healthcare" },
//         { icon: <HeartHandshake />, title: "Family Planning", desc: "Reproductive health services" },
//         { icon: <Stethoscope />, title: "Gynecologic Surgery", desc: "Advanced surgical procedures" },
//         { icon: <ShieldCheck />, title: "Cancer Screening", desc: "Early detection services" },
//         { icon: <ShieldCheck />, title: "PCOS/PCOD", desc: "Regular health monitoring" }
//     ]
// };

// export default function ServicesSection() {
//     const half = Math.ceil(services.pediatric.length / 2);
//     const half1 = Math.ceil(services.gynecology.length / 2);
//     const pediatricleftServices = services.pediatric.slice(0, half);
//     const pediatricrightServices = services.pediatric.slice(half);
//     const gynecologyleftServices = services.gynecology.slice(0, half1);
//     const gynecologyrightServices = services.gynecology.slice(half1);

//     return (
//         <div className="flex flex-col items-center py-10 px-5">
//             <h2 className="text-2xl font-semibold mb-2">Our Services</h2>
//             <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Gynecology Services</h3>
//             <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full">
//                 <div className="flex flex-col gap-4 w-full md:w-auto">
//                     {gynecologyleftServices.map((service, index) => (
//                         <ServiceCard key={index} title={service.title} description={service.desc} icon={service.icon} />
//                     ))}
//                 </div>
//                 <div className="w-64 h-64 flex justify-center items-center">
//                     <Image src="/Images/femaledoctor.png" alt="Doctor with Baby" width={250} height={250} />
//                 </div>
//                 <div className="flex flex-col gap-4 w-full md:w-auto">
//                     {gynecologyrightServices.map((service, index) => (
//                         <ServiceCard key={index} title={service.title} description={service.desc} icon={service.icon} />
//                     ))}
//                 </div>
//             </div>

//             <h3 className="text-2xl font-semibold text-blue-600 mb-6 mt-16 text-center">Pediatric Services</h3>
//             <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full">
//                 <div className="flex flex-col gap-4 w-full md:w-auto">
//                     {pediatricleftServices.map((service, index) => (
//                         <ServiceCard key={index} title={service.title} description={service.desc} icon={service.icon} />
//                     ))}
//                 </div>
//                 <div className="w-64 h-64 flex justify-center items-center">
//                     <Image src="/Images/mendoctor2.png" alt="Doctor with Baby" width={150} height={150} />
//                 </div>
//                 <div className="flex flex-col gap-4 w-full md:w-auto">
//                     {pediatricrightServices.map((service, index) => (
//                         <ServiceCard key={index} title={service.title} description={service.desc} icon={service.icon} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// function ServiceCard({ title, description, icon }) {
//     return (
//         <div className="relative flex flex-col p-4 px-6 border rounded-lg shadow-sm w-full md:w-72 h-18 overflow-hidden transition transform hover:scale-105">
//         {/* Top Right Icon */}
//         {/* <ArrowUpRight className="absolute top-2 right-2 w-5 h-5 border rounded-full p-0.5 cursor-pointer text-gray-500" /> */}
    
//         <div className="items-center gap-3 w-full">
//             <div className="w-10 h-10 flex justify-center items-center bg-blue-100 rounded-full">
//                 <span className="text-blue-600 text-lg">{icon}</span>
//             </div>
//             <div className="truncate">
//                 <h3 className="font-semibold truncate mt-1">{title}</h3>
//                 <p className="text-sm text-gray-600 truncate">{description}</p>
//             </div>
//         </div>
//     </div>
//     );
// }



import { Stethoscope, Syringe,ChevronRight , ArrowUpRight , HeartPulse, Baby, Activity,ShieldCheck,FileHeart ,ScanEye , BrainCircuit, CalendarHeart, HeartHandshake } from "lucide-react";

const services = {
    pediatric: [
        { icon: <Baby />, title: "Newborn Care", desc: "Comprehensive care for your newborn" },
        { icon: <Syringe />, title: "Vaccinations", desc: "Complete immunization programs" },
        { icon: <Activity />, title: "Developmental Screening", desc: "Monitor child growth and development" },
        { icon: <BrainCircuit />, title: "Behavioral Assessment", desc: "Child behavior and development evaluation" },
        { icon: <Stethoscope />, title: "Pediatric Treatment", desc: "Treatment for childhood illnesses" },
        { icon: <CalendarHeart />, title: "Child Health Check", desc: "Regular health monitoring" },
        { icon: <HeartPulse />, title: "Growth Monitoring", desc: "Track physical development" },
        { icon: <HeartHandshake />, title: "Emergency Care", desc: "24/7 emergency pediatric services" }
    ],
    gynecology: [
        { icon: <ShieldCheck />, title: "Gynecological Exams", desc: "Comprehensive women's health exams" },
        { icon: <HeartPulse />, title: "Fertility Treatment", desc: "Advanced fertility solutions" },
        { icon: <FileHeart />, title: "Menopause Care", desc: "Management of menopausal symptoms" },
        { icon: <ScanEye />, title: "Women's Health", desc: "General women's healthcare" },
        { icon: <HeartHandshake />, title: "Family Planning", desc: "Reproductive health services" },
        { icon: <Stethoscope />, title: "Gynecologic Surgery", desc: "Advanced surgical procedures" },
        { icon: <ShieldCheck />, title: "Cancer Screening", desc: "Early detection services" },
        { icon: <ShieldCheck />, title: "PCOS/PCOD", desc: "Regular health monitoring" }
    ]
};

export default function ServicesSection() {
    const half = Math.ceil(services.pediatric.length / 2);
    const half1 = Math.ceil(services.gynecology.length / 2);
    const pediatricleftServices = services.pediatric.slice(0, half);
    const pediatricrightServices = services.pediatric.slice(half);
    const gynecologyleftServices = services.gynecology.slice(0, half1);
    const gynecologyrightServices = services.gynecology.slice(half1);

    return (
        <div className="flex flex-col items-center py-10 px-5">
            <h2 className="text-2xl font-semibold mb-2">Our Services</h2>
            <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Gynecology Services</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full">
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    {gynecologyleftServices.map((service, index) => (
                        <ServiceCard key={index} title={service.title} description={service.desc} icon={service.icon} />
                    ))}
                </div>
                <div className="w-64 h-64 flex justify-center items-center">
                    <img src="/Images/femaledoctor.png" alt="Doctor with Baby" width={250} height={250} />
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    {gynecologyrightServices.map((service, index) => (
                        <ServiceCard key={index} title={service.title} description={service.desc} icon={service.icon} />
                    ))}
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-blue-600 mb-6 mt-16 text-center">Pediatric Services</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full">
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    {pediatricleftServices.map((service, index) => (
                        <ServiceCard key={index} title={service.title} description={service.desc} icon={service.icon} />
                    ))}
                </div>
                <div className="w-64 h-64 flex justify-center items-center">
                    <img src="/Images/mendoctor2.png" alt="Doctor with Baby" width={150} height={150} />
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    {pediatricrightServices.map((service, index) => (
                        <ServiceCard key={index} title={service.title} description={service.desc} icon={service.icon} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ServiceCard({ title, description, icon }) {
    return (
        <div className="relative flex flex-col p-4 px-6 border rounded-lg shadow-sm w-full md:w-72 h-18 overflow-hidden transition transform hover:scale-105">
        {/* Top Right Icon */}
        {/* <ArrowUpRight className="absolute top-2 right-2 w-5 h-5 border rounded-full p-0.5 cursor-pointer text-gray-500" /> */}
    
        <div className="items-center gap-3 w-full">
            <div className="w-10 h-10 flex justify-center items-center bg-blue-100 rounded-full">
                <span className="text-blue-600 text-lg">{icon}</span>
            </div>
            <div className="truncate">
                <h3 className="font-semibold truncate mt-1">{title}</h3>
                <p className="text-sm text-gray-600 truncate">{description}</p>
            </div>
        </div>
    </div>
    );
}

