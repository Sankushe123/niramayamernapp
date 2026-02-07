// "use client";
// import { useRouter, useParams, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { TbEdit } from "react-icons/tb";
// import { MdDeleteOutline } from "react-icons/md";
// import axios from "axios";
// import Swal from "sweetalert2";
// import slugify from "slugify";
// import Navbar from "@/components/widgets/Common/Navbar";

// const BlogWebDetails = () => {
//   const router = useRouter();
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const id = searchParams.get('slug');

//   const [blog, setBlog] = useState(null);


//   console.log('id', id);

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`/api/blogs/get/${id}`)
//         .then((response) => {
//           console.log('response', response);
//           setBlog(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching blog:", error);
//         });
//     }
//   }, [id]);



//   if (!blog) return <p className="text-center">Loading...</p>;

//   return (


//     <div className=" mx-auto p-4">
//       <Navbar/>
//       <div className="mx-auto rounded-lg shadow-md">

//         {Array.isArray(blog.imagesArray) && blog.imagesArray.length > 0 && blog.imagesArray[0] && (
//           <img
//             src={blog.imagesArray[0]}
//             alt={blog.blogTitle}
//             className="w-full max-h-[400px] object-cover rounded-lg mb-4"
//           />
//         )}

//         <div className="flex gap-4 bg-slate-100 p-4 rounded-md">
//           {/* Left Section */}
//           <div className="w-1/3 bg-white p-4 rounded-md shadow">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">FAQs</h2>
//             <div className="space-y-3">
//               <div>
//                 <p className="font-medium text-gray-700">Q: What is the purpose of this blog?</p>
//                 <p className="text-sm text-gray-600">This blog shares insights and tips related to mother and child care.</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-700">Q: Who can benefit from this?</p>
//                 <p className="text-sm text-gray-600">Expecting mothers, new parents, and caregivers can benefit the most.</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-700">Q: How often is the blog updated?</p>
//                 <p className="text-sm text-gray-600">We update the blog every week with new content and expert advice.</p>
//               </div>
//             </div>
//           </div>


//           {/* Right Section */}
//           <div className="w-2/3 p-10 rounded-md bg-red-300 shadow">
//             <div dangerouslySetInnerHTML={{ __html: blog.blogContent }} />
//           </div>
//         </div>
//       </div>
//     </div>


//   );
// };

// export default BlogWebDetails;
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/widgets/Common/Navbar";

const faqs = [
  {
    question: "What is the purpose of this blog?",
    answer:
      "This blog shares insights and tips related to mother and child care.",
  },
  {
    question: "Who can benefit from this?",
    answer:
      "Expecting mothers, new parents, and caregivers can benefit the most.",
  },
  {
    question: "How often is the blog updated?",
    answer:
      "We update the blog every week with new content and expert advice.",
  },
];

const BlogWebDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("slug");

  const [blog, setBlog] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showFaqs, setShowFaqs] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/blogs/get/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  if (!blog) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="w-full mt-5">
      <Navbar />

      {/* Banner Image */}
      {/* Banner Image */}
      {blog.imagesArray?.[0] && (
        <div className="w-full px-4 md:px-10 mt-4">
          <img
            src={blog.imagesArray[0]}
            alt={blog.blogTitle}
            className="
        w-full
        h-[180px]
        sm:h-[220px]
        md:h-[300px]
        object-cover
        rounded-lg
      "
          />
        </div>
      )}

      {/* Blog Title */}
      <div className="max-w-7xl mx-auto px-4 mt-4 md:mt-6">
        <h1 className="
    text-xl
    sm:text-2xl
    md:text-4xl
    font-bold
    text-gray-800
    leading-tight
  ">
          {blog.blogTitle}
        </h1>
      </div>


      {/* Mobile FAQ Toggle */}
      <div className="md:hidden px-4 mt-4">
        <button
          onClick={() => setShowFaqs(!showFaqs)}
          className="w-full bg-gray-800 text-white py-2 rounded-md"
        >
          {showFaqs ? "Hide FAQs" : "Show FAQs"}
        </button>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col md:flex-row gap-6">
        {/* FAQ Sidebar */}
        <aside
          className={`md:w-1/3 bg-white p-4 rounded-lg shadow 
          ${showFaqs ? "block" : "hidden"} md:block`}
        >
          <h2 className="text-lg font-semibold mb-4">FAQs</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                <button
                  onClick={() =>
                    setOpenFaqIndex(
                      openFaqIndex === index ? null : index
                    )
                  }
                  className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 font-medium text-left"
                >
                  {faq.question}
                  <span>{openFaqIndex === index ? "−" : "+"}</span>
                </button>

                {openFaqIndex === index && (
                  <div className="px-4 py-3 text-sm text-gray-600 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Blog Content */}
        <main className="md:w-2/3 bg-white p-6 md:p-8 rounded-lg shadow">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.blogContent }}
          />
        </main>
      </div>
    </div>
  );
};

export default BlogWebDetails;
