'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';

export default function PatientReviews() {
  const [videoReviews, setVideoReviews] = useState([]);
  const [textReviews, setTextReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation controllers
  const videoMarqueeControls = useAnimation();
  const textMarqueeControls = useAnimation();

  // Constants
  const CARD_WIDTH = 320; // px
  const GAP = 24; // px
  const VISIBLE_CARDS = 3;

  // Fetch reviews on mount
  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/review/get');
      const all = res.data;

      const videos = all.filter((r) => r.reviewType === 'video');
      const texts = all.filter((r) => r.reviewType === 'text');

      setVideoReviews(videos);
      setTextReviews(texts);
    } catch (err) {
      console.error('Error fetching reviews', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Start video marquee if enough reviews
  useEffect(() => {
    if (videoReviews.length > VISIBLE_CARDS) {
      startVideoMarquee();
    } else {
      videoMarqueeControls.stop();
    }
  }, [videoReviews]);

  // Start text marquee if enough reviews
  useEffect(() => {
    if (textReviews.length > VISIBLE_CARDS) {
      startTextMarquee();
    } else {
      textMarqueeControls.stop();
    }
  }, [textReviews]);

  // Animation functions for video
  const startVideoMarquee = () => {
    const singleSetWidth = videoReviews.length * (CARD_WIDTH + GAP);
    videoMarqueeControls.start({
      x: [0, -singleSetWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear',
        },
      },
    });
  };
  const stopVideoMarquee = () => {
    videoMarqueeControls.stop();
  };

  // Animation functions for text (left to right)
  const startTextMarquee = () => {
    const singleSetWidth = textReviews.length * (CARD_WIDTH + GAP);
    textMarqueeControls.start({
      x: [-singleSetWidth, 0], // reversed direction
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear',
        },
      },
    });
  };

  const stopTextMarquee = () => {
    textMarqueeControls.stop();
  };

  return (
    <div className="max-w-12xl mx-auto  py-16 text-center overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">What Our Patients Say</h2>

      {/* Video Reviews Section */}
      <div
        className="relative overflow-hidden mx-auto mb-16"
        style={{ width: VISIBLE_CARDS * (CARD_WIDTH + GAP) - GAP }}
        onMouseEnter={stopVideoMarquee}
        onMouseLeave={() => {
          if (videoReviews.length > VISIBLE_CARDS) startVideoMarquee();
        }}
      >
        {loading ? (
          <p>Loading video reviews...</p>
        ) : videoReviews.length === 0 ? (
          <p>No video reviews available</p>
        ) : videoReviews.length <= VISIBLE_CARDS ? (
          <div className="flex gap-6 justify-center">
            {videoReviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded shadow overflow-hidden"
                style={{ width: CARD_WIDTH }}
              >
                <video controls className="w-full h-52 object-cover">
                  <source src={review.videoUrl} type="video/mp4" />
                </video>
                <div className="p-4 text-left">
                  <h3 className="font-semibold">{review.reviewerName}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-6"
            style={{
              width: (videoReviews.length * 2) * (CARD_WIDTH + GAP) - GAP,
            }}
            animate={videoMarqueeControls}
          >
            {[...videoReviews, ...videoReviews].map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="bg-white rounded shadow overflow-hidden"
                style={{ width: CARD_WIDTH }}
              >
                <iframe
                  className="w-full h-40 rounded"
                  src={`https://www.youtube.com/embed/${new URL(review.videoUrl).searchParams.get('v')}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="p-4 text-left">
                  <h3 className="font-semibold">{review.reviewerName}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Text Reviews Section */}
      <div
        className="relative overflow-hidden mx-auto"
        style={{ width: VISIBLE_CARDS * (CARD_WIDTH + GAP) - GAP }}
        onMouseEnter={stopTextMarquee}
        onMouseLeave={() => {
          if (textReviews.length > VISIBLE_CARDS) startTextMarquee();
        }}
      >
        {loading ? (
          <p>Loading text reviews...</p>
        ) : textReviews.length === 0 ? (
          <p>No text reviews available</p>
        ) : textReviews.length <= VISIBLE_CARDS ? (
          <div className="flex gap-6 justify-center">
            {textReviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-100 rounded shadow p-6 text-left"
                style={{ width: CARD_WIDTH }}
              >
                <p className="text-gray-600">"{review.reviewText}"</p>
                <p className="mt-5 font-semibold">{review.reviewerName}</p>
                <p className="text-yellow-700 flex items-center gap-1">
                  {Array.from({ length: Math.round(Number(review.rating)) }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  <span className="text-gray-600 ml-1">({review.rating})</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-6"
            style={{
              width: (textReviews.length * 2) * (CARD_WIDTH + GAP) - GAP,
            }}
            animate={textMarqueeControls}
          >
            {[...textReviews, ...textReviews].map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="bg-gray-100 rounded shadow p-6 text-left"
                style={{ width: CARD_WIDTH }}
              >
                <p className="text-gray-600">"{review.reviewText}"</p>
                <p className="mt-4 font-semibold">{review.reviewerName}</p>
                <p className="text-yellow-700 mt-2 flex items-center gap-1">
                  {Array.from({ length: Math.round(Number(review.rating)) }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  <span className="text-gray-600 ml-1">({review.rating})</span>
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
