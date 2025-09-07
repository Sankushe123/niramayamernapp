/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dzmndqvb2",
        NEXT_PUBLIC_CLOUDINARY_API_KEY: "994193141147742",
        CLOUDINARY_API_SECRET: "HAVSfgaSxL8jY8EIlbfSvie0u6E",

        NEXT_PUBLIC_ROLES: JSON.stringify(["admin", "user", "receptionist", "doctor"]),
        NEXT_PUBLIC_Services: JSON.stringify([
            'Dashboard',
            'Master',
            'Blogs Management',
            'FAQ Management',
            'Access Management',
            'User Management',
            'Appointment Management'
        ]),
        NEXT_PUBLIC_JWTKEY: 'c545da6f3eb9590a7867c403df6b5119597fe3cde62dddc14d1a121d6b0e5fac4202eaf8366aca7b668d88d0571f7175a73306cc951b7a8045516de5ae80da74',
        NEXT_EMERGENCY_CONTACT_NO: '+91 8530552942',

        EMAIL_USER: 'shubhamankushe93@gmail.com',
        EMAIL_PASS: 'wfot rdbw wegn tocx',
        ADMIN_EMAIL: 'sankushe05@gmail.com',
        NEXT_PUBLIC_API_BASE_URL:'http://localhost:5000',

        clinic_Address: 'Ranjan Heights, SB Patil School Rd Ravet, Pimpri-Chinchwad',

        NEXT_doctorsInfo: JSON.stringify([
            {
                name: "Dr.Amol Thorat",
                degree: "MBBS DCH DNB",
                // specialty: "Pediatrician & Neonatologist",
                description: "Specialized in newborn care, child health, and neonatal treatments.",
                image: "/images/drAmol.jpeg",
                socialLink: "https://twitter.com",
            },
            {
                name: "Dr.Deepa Thorat",
                degree: "MBBS MD DNB FRM FMAS",
                // specialty: "Obstetrics & Gynaecology, Laparoscopic Surgeon, Infertility Specialis",
                description: "Specialized in women's health, laparoscopic surgeries, and infertility treatments.",
                image: "/images/drDeep1.jpg",
                socialLink: "https://linkedin.com",
            }
        ]),
    }
};

export default nextConfig;
