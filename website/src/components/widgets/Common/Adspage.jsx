import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";


const Adspage = ({ showAd, setShowAd }) => {
  const [activeBanner, setActiveBanner] = useState(null);

  useEffect(() => {
    const fetchActiveBanner = async () => {
      try {
        const res = await axios.get(`/api/banner/get`);
        const active = res.data.find((b) => b.status === "active");
        setActiveBanner(active || null);
      } catch (err) {
        console.error("Error fetching active banner:", err);
      }
    };

    if (showAd) {
      fetchActiveBanner();
    }
  }, [showAd]);

  if (!showAd || !activeBanner) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      {/* Close Button */}
      <button
        onClick={() => setShowAd(false)}
        className="absolute top-4 right-4 text-4xl text-white hover:text-gray-300 transition z-50"
      >
        <IoClose />
      </button>

      {/* Banner Image */}
      <img
        src={activeBanner.imageUrl}
        alt={activeBanner.bannerEventName}
        className="w-full h-auto max-h-[90vh] object-contain"
      />
    </div>
  );
};

export default Adspage;
