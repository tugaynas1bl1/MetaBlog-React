import React, { useState } from 'react'
import Blogs from './Blogs'
import { Link } from 'react-router-dom'
import { useDarkMode } from '../stores/darkModeStore'
import { useBlur } from '../stores/blurStore'

const Search = ({searchTxt, blogs}) => {
    const {isDarkModeActive } = useDarkMode()
    const { disableBlur } = useBlur()

    const [count, setCount] = useState(0);

    const refreshComponent = () => {
        setCount(prev => prev + 1);
    };

    return (
        <div className={`${isDarkModeActive ?  "bg-gray-800" : "bg-[#ababac]" } xl:w-7xl lg:w-280 md:w-120 w-80 flex rounded-xl shadow-xl overflow-y-auto shadow-black flex-wrap gap-7 md:h-140 h-156 md:py-10 py-5 absolute top-23 xl:right-5 justify-center lg:right-10 md:right-11 right-5 z-1 md:p-10 p-1`}>
            { blogs.map(blog => (
                searchTxt.length >= 3 ?
                        <Link onClick={(e) => {disableBlur(); refreshComponent()}} to={`/blog-details/${blog?._id}`}>
                            <div className={`${isDarkModeActive ? "border-[#242535] bg-[#181A2A] hover:bg-gray-800" : "border-[#E8E8EA] bg-white hover:bg-blue-100"} md:w-[392px] hover:scale-110 transition-all duration-500 w-[310px] md:h-[476px] h-[380px] flex shadow-lg shadow-black/50 flex-col gap-4 justify-center border lg:mx-0 mx-auto items-center rounded-xl`}>
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
                        </Link> : ""
            ))} 
        </div>
    )
}

export default Search
