import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Thumbnail = ({blog}) => {
  return (
    <>
      <Link to={`/blog-details/${blog?._id}`}>
        <div className="lg:w-full w-full max-w-[1540px] lg:h-[490px] md:w-180 lg:-ml-3 md:-ml-16 h-80 relative mx-auto px-4 cursor-pointer hover:scale-105 transition-all duration-550">
          <img className="w-full h-full object-cover rounded-xl" src={blog?.image} alt="" />
          <div className="absolute inset-4 bg-black/65 h-full top-0 rounded-xl hover:bg-black/75 transition-all duration-500"></div>
          <div className='absolute flex flex-col lg:top-[238px] top-[150px] left-10 gap-5'>
            <p className='md:w-[97px] lg:h-7 w-[70px] h:[30px] text-center md:text-[14px] text-[10px] text-white bg-[#4B6BFB] px-2.5 py-1 rounded-md'>{blog?.category}</p>
            <h1 className="md:w-[800px] w-[300px] lg:text-[36px] text-[16px] text-white font-semibold">{blog?.title.length >= 50 ? `${blog?.title.slice(0,50)} ...` : blog?.title}</h1>
            <div className='flex text-white gap-5 lg:text-[16px] text-[10px]'>
                <p className='font-medium'>{blog?.user?.email}</p>
                <p>{blog?.formattedDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Thumbnail
