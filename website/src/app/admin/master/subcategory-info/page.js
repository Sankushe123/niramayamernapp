"use client";
import React, { Suspense } from "react";
import SubcategoryInfo from "@/components/Masters/Subcategory/SubcategoryInfo";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubcategoryInfo />
    </Suspense>
  );
};

export default Page;
