"use client";
import AddReview from '@/components/ReviewsMgm/Addreviews'
import React, { Suspense } from "react";

const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddReview />
        </Suspense>
    )
}

export default page