import React from 'react'
import { useDarkMode } from '../stores/darkModeStore'
import { Link } from 'react-router-dom'

const Blogs = ({blog}) => {

    const { isDarkModeActive } = useDarkMode()
    return (
        <Link to={`/blog-details/${blog?._id}`}>
            <div className={`${isDarkModeActive ? "border-[#242535] hover:bg-gray-800" : "border-[#E8E8EA] hover:bg-blue-100"} md:w-[392px] hover:scale-110 transition-all duration-500 w-[310px] md:h-[476px] h-[380px] flex shadow-lg shadow-black/50 flex-col gap-4 justify-center border lg:mx-0 mx-auto items-center rounded-xl`}>
                <img className="md:w-[360px] mt-4  w-[280px] md:h-60 h-40 object-cover rounded-md" src={blog?.image} alt="Wrong Img" />
                <div className='flex flex-col p-2 gap-5 md:w-[360px] items-center'>
                    <p className={`${isDarkModeActive ? "bg-[#4B6BFB0D]" : "bg-white"} md:text-[16px]  text-[11px]  md:px-2.5 px-2 py-1 rounded-md text-center h-7 font-medium text-[#4B6BFB] md:ml-2.5`}>{blog?.category}</p>
                    <h1 className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-center md:text-[24px] text-[16px] font-semibold leading-7 line-clamp-3 h-[60px] text-ellipsis`}>{blog?.title.length >= 50 ? `${blog?.title.slice(0,50)} ...` : blog?.title}</h1>
                    <div className='flex flex-col text-[#97989F] gap-5'>
                        <p className='font-medium md:text-[16px] -mt-1 text-[12px] text-center'>{blog?.user?.email}</p>
                        <p className='md:text-[16px] -mt-2 text-[12px] text-center'>{blog?.formattedDate}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Blogs
