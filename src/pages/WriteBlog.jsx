import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useDarkMode } from '../stores/darkModeStore'
import { Link } from 'react-router-dom'
import api from '../utils/axios'
import { useTokens } from '../stores/tokenStore'
import { useBlur } from '../stores/blurStore'

const WriteBlog = () => {
    const { isDarkModeActive } = useDarkMode()
    const [categories, setCategories] = useState([])
    const [ blogData, setBlogData ]  = useState({title: "", description: "", category: "", image: ""})
    const { isBlurEnabled } = useBlur()

    const getCategories = async () => {
        try {
            const { data, statusText } = await api.get("blogs/categories")
            
            if (statusText === "OK") setCategories(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDatas = (title, value) => {
        setBlogData(prevState => ({
            ...prevState, 
            [title]: value
        }))
    }

    const handleSubmit = async () => {
        if (blogData.title === ""){
            alert("Please fill the title")
        }
        else if (blogData.category === "Select category"){
            alert("Please select one of the categories")
        }
        else if (blogData.image === ""){
            alert("You should give an image url")
        }
        else if (blogData.description === ""){
            alert("You can't leave body blank")
        }
        else{
            try {
                const { data, statusText } = await api.post("blogs", blogData)

                if (statusText === "OK"){
                    alert("Your blog created successfully")
                    window.location.reload()
                }
            } catch (error) {
                console.error(error)
            }
        }
    }


    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <div className={`${isBlurEnabled ? "" : "hidden"} w-full h-screen fixed top-30 z-5 backdrop-blur-xl`}></div>
            <div className='lg:max-w-[1340px] flex flex-col max-w-[560px] w-full mx-auto lg:pl-5 gap-12 relative'>
                <Header activeMenu="Write a Blog" />
                <div className='flex flex-col justify-center items-center gap-[111px] mb-10'>
                    <h1 className={`${isDarkModeActive ? "text-white" : "text-[#232536]"} md:text-[48px] text-[32px] font-bold`}>Write a new blog</h1>

                    <div className='flex flex-col max-w-[769px] md:w-full h-fit'>
                        <input className={`${isDarkModeActive ? "placeholder-white text-white": "placeholder-[#232536] text-[#232536]"} border border-[#6D6E7680] rounded-xs outline-none mb-[33px] py-6 px-6 md:h-fit h-2.5`} placeholder='Add title for blog' type="text" onChange={(e) => {
                            handleDatas("title", e.target.value.trim())
                        }} />
                        <select defaultValue={"Select category"} className={`${isDarkModeActive ? "text-white": "text-[#232536]"} border cursor-pointer border-[#6D6E7680] rounded-xs outline-none mb-[33px] py-6 px-6 md:h-fit h-2.5`} onChange={(e) => {
                            handleDatas("category", e.target.value)
                        }}>
                            <option value=""  defaultValue={"Select category"} hidden>Select category</option>
                            {categories.map((c, i)=> <option className="text-[#232536] hover:bg-gray-400 cursor-pointer" key={i} value={c}>{c}</option> )}
                        </select>
                        <input className={`${isDarkModeActive ? "placeholder-white text-white": "placeholder-[#232536] text-[#232536]"} border border-[#6D6E7680] rounded-xs outline-none mb-[33px] py-6 px-6 md:h-fit h-2.5`} placeholder='Add thumbnail image' type="text" onChange={(e) => {
                            handleDatas("image", e.target.value.trim())
                        }}/>
                        <textarea className={`${isDarkModeActive ? "placeholder-white text-white": "placeholder-[#232536] text-[#232536]"} border border-[#6D6E7680] rounded-xs outline-none mb-[45px] py-6 px-6 md:h-fit h-2.5`} placeholder='Add blog body' type="text" onChange={(e) => {
                            handleDatas("description", e.target.value.trim())
                        }}/>
                        <button onClick={handleSubmit} className='bg-[#FFD050] md:text-[24px] cursor-pointer hover:bg-[#ffbc04] hover:rounded-tl-[50px] hover:rounded-br-[50px] hover:rounded-tr-[50px] hover:rounded-bl-[50px] text-center text-[14px] text-[#232536] font-bold md:py-5 py-3.5 md:h-fit h-[45px] transition-all duration-500'>Submit</button>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default WriteBlog
