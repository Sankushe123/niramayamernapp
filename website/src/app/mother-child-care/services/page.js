"use client";
import React, { Suspense } from "react";
import ServicesInfo from '@/components/web/Services/ServicesInfo'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesInfo />
    </Suspense>
  )
}

export default page