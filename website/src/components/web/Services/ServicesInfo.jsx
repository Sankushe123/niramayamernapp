'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Breadcrumbs from '@/components/widgets/Common/Breadcrumbs';
import Navbar from '@/components/widgets/Common/Navbar';
import BlogCard from '@/components/widgets/Common/BlogCard';
import { Plus, Minus, Share2 } from 'lucide-react';

const ServicesInfo = () => {
  const { categorySlug, subcategorySlug } = useParams();

  const [subcatInfo, setSubcatInfo] = useState(null);
  const [subcatInfoBlogs, setSubcatInfoBlogs] = useState([]);
  const [subcatInfoFaqs, setSubcatInfoFaqs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('category');
  const rawSubcategory = searchParams.get('subcategory');

  // Fix malformed category if needed
  let category = rawCategory;
  let subcategory = rawSubcategory;

  if (rawCategory && rawCategory.includes('?subcategory=')) {
    const parts = rawCategory.split('?subcategory=');
    category = parts[0];
    subcategory = parts[1];
  }

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Use the fixed category & subcategory for API call
    if (category && subcategory) {
      getData(category, subcategory);
    }
  }, [category, subcategory]);

  const getData = async (categoryParam, subcategoryParam) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/subcatinfo/by-slug', {
        categorySlug: categoryParam,
        subcategorySlug: subcategoryParam,
      });
      const data = response.data;

      if (!data || Object.keys(data).length === 0) {
        setError('No subcategory information found.');
        setSubcatInfo(null);
        setSubcatInfoBlogs([]);
        setSubcatInfoFaqs([]);
        return;
      }

      setSubcatInfo(data);
      setSubcatInfoBlogs(data.blogs || []);
      setSubcatInfoFaqs(data.faqs || []);
    } catch (err) {
      console.error('❌ API error:', err);
      if (err.response) {
        setError(
          `Server Error (${err.response.status}): ${
            err.response.data?.message || 'Something went wrong.'
          }`
        );
      } else if (err.request) {
        setError('Network error: Server did not respond. Please try again.');
      } else {
        setError('Unexpected error: ' + err.message);
      }
      setSubcatInfo(null);
      setSubcatInfoBlogs([]);
      setSubcatInfoFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  const formatSlugToTitle = (slug) => {
    return (
      slug
        ?.split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') || ''
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12">
      <div className="mt-3 md:mt-3">
        <Navbar />
      </div>

      <div className="mt-5 bg-gray-200 text-white py-2 rounded flex items-center">
        <Breadcrumbs />
      </div>

      <div className="mt-6 mx-14 mb-5">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div>
              <h1 className="text-base sm:text-lg text-[#DE409E]">
                {formatSlugToTitle(categorySlug || category)}
              </h1>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono mt-1 font-semibold text-gray-900">
                {formatSlugToTitle(subcategorySlug || subcategory)}
              </h1>
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-2 text-sm sm:text-base border border-[#DE409E] text-white px-4 py-1.5 rounded-lg hover:bg-pink-100 transition"
            >
              <Share2 size={18} color="#DE409E" />
            </button>
          </div>
        </div>

        {loading && <p className="text-blue-500 mt-4">Loading subcategory info...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {!loading && subcatInfo && !error && (
          <div className="mt-6">
            <h1 className="text-2xl sm:text-2xl font-bold">{subcatInfo.subCategoryTitle}</h1>
            <div
              className="mt-2 text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: subcatInfo.subCategoryContent || '' }}
            />

            {subcatInfo.imagesArray?.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Images:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subcatInfo.imagesArray.map((img, i) => (
                    <img key={i} src={img} alt={`Image ${i + 1}`} className="rounded shadow w-full" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {subcatInfoBlogs?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Related Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcatInfoBlogs.map((blog) => (
                <div key={blog._id}>
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          </div>
        )}

        {subcatInfoFaqs?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {subcatInfoFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq._id}
                    className="border border-gray-300 rounded-lg overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex justify-between items-center p-4 text-left text-base sm:text-lg font-medium text-gray-800 focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <span className="w-7 h-7 flex items-center justify-center border border-gray-400 rounded-full text-sm text-gray-700">
                        {isOpen ? <Minus size={16} /> : <Plus color="#DE409E" size={16} fontWeight={22} />}
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-300 px-4 text-gray-600 ${
                        isOpen ? 'max-h-[500px] pb-4' : 'max-h-0 overflow-hidden'
                      }`}
                    >
                      <p className="text-sm sm:text-base">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesInfo;
