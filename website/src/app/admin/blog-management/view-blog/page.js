"use client";
import React, { Suspense } from "react";
import BlogDetails from "@/components/BlogManagement/BlogDetails";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogDetails />
    </Suspense>
  );
};

export default Page;
