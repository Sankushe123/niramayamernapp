import React, { Suspense } from 'react'
import BlogsList from '@/components/web/Blogs/BlogsList'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading blogs...</div>}>
        <BlogsList />
      </Suspense>
    </div>
  )
}

export default Page
