import React, { useEffect, useState } from 'react'
import logo from '../assets/Union.png'
import { useDarkMode } from '../stores/darkModeStore'
import logoWhite from '../assets/Union-white.png'
import api from '../utils/axios'

const Footer = () => {

    const { isDarkModeActive } = useDarkMode()
    const [ categories, setCategories ] = useState()

    const getCategories = async () => {
        try {
            const { data, statusText } = await api.get("blogs/categories")
            
            if (statusText === "OK") setCategories(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="flex flex-col w-full">
            <div className="max-w-[1480px] flex flex-col w-full mx-auto gap-16">
                <div className=" mt-20 flex flex-col lg:flex-row justify-between mx-auto py-16 xl:gap-160 gap-16">
                    <div>
                        <div className="flex flex-col">
                            <h1 className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-[18px] font-semibold mb-3`}>About</h1>
                            <p className={`${isDarkModeActive ? "text-[#97989F]" : "text-[#696A75]"} w-[280px] h-[120px] mb-6`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                            <p className={`${isDarkModeActive ? "text-[#97989F]" : "text-[#3B3C4A]"}`}><strong className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"}`}>Email :</strong> info@jstemplate.net</p>
                            <p className={`${isDarkModeActive ? "text-[#97989F]" : "text-[#3B3C4A]"}`}><strong className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"}`}>Phone :</strong> 880 123 456 789</p>
                        </div>
                    </div>

                    <div className="flex gap-20">
                        <div className="flex flex-col">
                            <h2 className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-[18px] font-semibold mb-6`}>Quick Link</h2>

                            <ul className={`${isDarkModeActive ? "text-[#BABABF]" : "text-[#3B3C4A]"} flex flex-col gap-2`}>
                                <li>Home</li>
                                <li>Write a Blog</li>
                                <li>My Blogs</li>
                                <li>Contact</li>
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <h2 className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-[18px] font-semibold mb-6`}>Category</h2>
                            <div className={`${isDarkModeActive ? "text-[#BABABF]" : "text-[#3B3C4A]"} flex flex-col gap-2`}>
                                {categories?.map((c, i) => <button key={i} className='text-left cursor-pointer'>{c}</button>)}
                            </div>
                        </div>
                    </div>
                </div>





                <div className="flex lg:flex-row flex-col lg:mx-0 lg:-ml-2 lg:gap-0 gap-10 mx-auto justify-between lg:px-[90px] pb-[47px]">
                    <div className='flex justify-center items-center'>
                        <img className="lg:w-12 lg:h-12 w-10 h-10 float-left mr-2.5" src={isDarkModeActive ? logoWhite : logo} alt="" />
                        <div className='flex flex-col'>
                            <p className={`${isDarkModeActive ? "text-white" : "text-[#141624]"} lg:text-[20px] md:text-[16px] sm:text-[12px]`}>Meta<span className="font-medium">Blog</span></p>
                            <p className={`${isDarkModeActive ? "text-white" : "text-[#3B3C4A]"} lg:text-[20px] md:text-[16px] sm:text-[12px]`}>© JS Template 2023. All Rights Reserved.</p>
                        </div>
                    </div>
                    

                    <div className={`${isDarkModeActive ? "text-[#BABABF]" : "text-[#3B3C4A]"} flex gap-8 md:text-[16px] text-[12px]`}>
                        <p>Terms of Use</p>
                        <div className={`${isDarkModeActive ? "border-[#242535]" : "border-[#E8E8EA]"} border md:h-6 mt-0.5`}></div>
                        <p>Privacy Policy</p>
                        <div className={`${isDarkModeActive ? "border-[#242535]" : "border-[#E8E8EA]"} border md:h-6 mt-0.5`}></div>
                        <p>Cookie Policy</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer
