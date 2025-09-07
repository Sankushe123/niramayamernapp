"use client";
import React, { Suspense } from "react";
import AddBlog from "@/components/BlogManagement/AddBlog";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddBlog />
    </Suspense>
  );
};

export default Page;
