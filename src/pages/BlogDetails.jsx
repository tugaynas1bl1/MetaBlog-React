import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BlogDetail from '../components/BlogDetail'
import { useBlur } from '../stores/blurStore'

const BlogDetails = () => {

  const { isBlurEnabled } = useBlur()

  return (
    <>
        <div className={`${isBlurEnabled ? "" : "hidden"} w-full h-screen fixed top-30 z-5 backdrop-blur-xl`}></div>
        <div className="lg:max-w-[1340px] flex flex-col max-w-[560px] w-full mx-auto lg:pl-5 gap-12 relative">
            <Header />
            <BlogDetail />
        </div>
        <Footer />
        
    </>
  )
}

export default BlogDetails
