import React, { useEffect, useState } from 'react'
import { useDarkMode } from '../stores/darkModeStore'
import { Link } from 'react-router-dom'

const Blogs = ({blog, isSelectPressed, selectedIds, toggleSelect}) => {

    const { isDarkModeActive } = useDarkMode()
    const [isChecked, setIsChecked] = useState(false)

    return (
        <>
        {isSelectPressed ? (
            <div onClick={(e) => {toggleSelect(blog._id, !selectedIds.includes(blog._id))}} className={`${isDarkModeActive ? "border-[#242535] hover:bg-red-800" : "border-[#E8E8EA] hover:bg-red-800"} md:w-[392px] hover:scale-103 cursor-pointer transition-all duration-500 w-[310px] md:h-[476px] h-[380px] flex shadow-lg shadow-black/50 flex-col gap-4 justify-center border lg:mx-0 mx-auto items-center rounded-xl relative`}>
                { isSelectPressed ? <input type="checkbox" className={`absolute top-2.5 w-4 h-4 right-5 cursor-pointer`} onClick={(e) => {e.stopPropagation(); e.target.checked}} checked={selectedIds.includes(blog._id)} onChange={(e) => toggleSelect(blog._id, e.target.checked)}/> : ""}
                
                <img className="md:w-[360px] mt-4  w-[280px] md:h-60 h-40 object-cover rounded-md" src={blog?.image} alt="Wrong Img" />
                <div className='flex flex-col p-2 gap-5 md: w-[360px] items-center'>
                    <p className={`${isDarkModeActive ? "bg-[#4B6BFB0D]" : "bg-white"} md:text-[16px]  text-[11px]  md:px-2.5 px-2 py-1 rounded-md text-center h-7 font-medium text-[#4B6BFB] md:ml-2.5`}>{blog?.category}</p>
                    <h1 className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-center md:text-[24px] text-[16px] font-semibold leading-7 line-clamp-3 h-[60px] text-ellipsis`}>{blog?.title.length >= 50 ? `${blog?.title.slice(0,50)} ...` : blog?.title}</h1>
                    <div className='flex text-[#97989F] gap-5'>
                        <p className='font-medium md:text-[16px] text-[12px] text-center'>{blog?.user?.email}</p>
                        <p className='md:text-[16px] text-[12px] text-center'>{blog?.formattedDate}</p>
                    </div>
                </div>
            </div>
        ) :
        <Link to={`/blog-details/${blog?._id}` }>
            <div className={`${isDarkModeActive ? "border-[#242535] hover:bg-gray-800" : "border-[#E8E8EA] hover:bg-blue-100"} lg:w-[392px] md:w-[300px] hover:scale-110 transition-all duration-500 w-[310px] lg:h-[476px] md:h-[370px] h-[380px] flex shadow-lg shadow-black/50 flex-col gap-4 justify-center border lg:mx-0 mx-auto items-center rounded-xl relative`}>
                
                <img className="lg:w-[360px] md:w-[280px] mt-4  w-[280px] lg:h-60 h-40 object-cover rounded-md" src={blog?.image} alt="Wrong Img" />
                <div className='flex flex-col p-2 gap-5 md:w-[360px] items-center'>
                    <p className={`${isDarkModeActive ? "bg-[#4B6BFB0D]" : "bg-white"} md:text-[16px]  text-[11px]  md:px-2.5 px-2 py-1 rounded-md text-center h-7 font-medium text-[#4B6BFB] md:ml-2.5`}>{blog?.category}</p>
                    <h1 className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-center lg:text-[24px] md:text-[20px] lg:px-0 md:px-5 text-[16px] font-semibold leading-7 line-clamp-3 h-[60px] text-ellipsis`}>{blog?.title.length >= 50 ? `${blog?.title.slice(0,50)} ...` : blog?.title}</h1>
                    <div className='flex text-[#97989F] lg:px-0 md:px-10 gap-5'>
                        <p className='font-medium lg:text-[16px] md:text-[14px] text-[12px] text-center'>{blog?.user?.email}</p>
                        <p className='lg:text-[16px] md:text-[14px] text-[12px] text-center'>{blog?.formattedDate}</p>
                    </div>
                </div>
            </div>
        </Link>
        }
        </>
    )
}

export default Blogs