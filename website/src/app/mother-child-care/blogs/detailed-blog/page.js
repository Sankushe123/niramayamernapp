import React, { Suspense } from 'react'
import BlogWebDetails from '@/components/web/Blogs/BlogWebDetails'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading blog details...</div>}>
        <BlogWebDetails />
      </Suspense>
    </div>
  )
}

export default Page
