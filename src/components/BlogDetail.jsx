import React, { useEffect, useState } from 'react'
import { useDarkMode } from '../stores/darkModeStore'
import api from '../utils/axios'
import { useParams } from 'react-router-dom'
import { formatDate } from '../stores/formattingDate'

const BlogDetail = () => {
    const { isDarkModeActive } = useDarkMode()

    const {id} = useParams()
    const [blogDetails, setBlogDetails] = useState({})

    const getBlogDetails = async () => {
        try {
            const { data, statusText } = await api.get(`blogs/blog/${id}`)

            const formattedBlog = {
                ...data,
                formattedDate: formatDate(data.createdAt)
            }
            if(statusText === "OK") setBlogDetails(formattedBlog)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getBlogDetails()
    }, [id])

    return (
        <div className="flex flex-col gap-8 max-w-200 w-full px-4 md:px-0 mx-auto">
            <p className={`md:w-[97px] lg:h-7 w-[70px] h:[30px] text-center md:text-[14px] text-[10px] text-white bg-[#4B6BFB] px-2.5 py-1 rounded-md`}>{blogDetails.category}</p>
            <h1 className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} md:text-[36px] text-[16px] leading-6 font-semibold md:leading-12`}>{blogDetails.title}</h1>
            <div className='flex text-white gap-5 lg:text-[16px] text-[10px]'>
                <p className='font-medium text-[#696A75]'>{blogDetails.user?.email}</p>
                <p className='text-[#696A75]'>{blogDetails.formattedDate}</p>
            </div>
            <img className="rounded-xl w-full h-fit object-cover" src={blogDetails.image} alt="Wrong IMG" />
            <p className={`${isDarkModeActive ? " text-white" : "text-[#3B3C4A]"} lg:text-[20px] md:text-[16px] text-[14px] w-full`}>{blogDetails.description}</p>
        </div>
    )
}

export default BlogDetail
