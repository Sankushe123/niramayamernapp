import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Best Pediatrician & Gynecologist in Pune | Expert Women's & Child Care",
  description:
    "Looking for the best pediatrician and gynecologist in Pune? We offer expert healthcare services for women and children in Pimpri-Chinchwad, Wakad, Hinjawadi, and more. Book an appointment today!",
  keywords: [
    "best pediatrician in Ravet",
    "best gynecologist in Ravet",
    "best pediatrician in Pune",
    "best gynecologist in Pune",
    "best pediatrician in Pimpri-Chinchwad",
    "best gynecologist in Pimpri-Chinchwad",
    "pediatric clinic in Pimpri-Chinchwad",
    "gynecology clinic in Wakad",
    "women's health in Hinjawadi",
    "child specialist in Akurdi",
    "pregnancy care in Talwade",
    "fertility specialist in Bhosari",
    "prenatal care in Dehu",
    "postnatal care in Tathawade",
    "gynecological surgery in Punawale",
    "obstetrician in Nigdi",
    "vaccination clinic in Pune",
    "high-risk pregnancy care in Pune",
    "high-risk pregnancy care in Ravet",
    "child healthcare in Ravet",
  ].join(", "),
  author: "Your Clinic Name",
  openGraph: {
    title: "Best Pediatrician & Gynecologist in Ravet | Women's & Child Care",
    description:
      "Get expert pediatric and gynecology care in Ravet. We serve Pimpri-Chinchwad, Wakad, Hinjawadi, Akurdi, Talwade, Bhosari, and more. Book your consultation today!",
    type: "website",
    url: "https://www.niramayamotherchildcare.com/",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Best Pediatrician & Gynecologist in Ravet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Pediatrician & Gynecologist in Ravet",
    description:
      "Find expert women's and child healthcare services in Pune, Pimpri-Chinchwad, Wakad, Hinjawadi, and surrounding areas. Schedule an appointment now!",
    images: ["https://yourwebsite.com/twitter-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
