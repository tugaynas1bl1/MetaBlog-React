import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Blogs from '../components/Blogs'
import { useTokens } from '../stores/tokenStore'
import api from '../utils/axios'
import { useDarkMode } from '../stores/darkModeStore'
import { useBlur } from '../stores/blurStore'

const Author = () => {
  const { accessToken } = useTokens()
  const [ email, setEmail ] = useState()
  const [ authorBlogs, setAuthorBlogs ] = useState()
  const { isDarkModeActive } = useDarkMode()
  const { isBlurEnabled } = useBlur()

  const getAuthorBlogs = async () => {
    try {
      const { data, statusText } = await api.get(`blogs/user/me`)


      if (statusText === "OK") setAuthorBlogs(data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAuthorBlogs()
    setEmail(localStorage.getItem("email"))
    
  }, [])

  useEffect(() => {
    getAuthorBlogs
  }, [accessToken])

  return (
    <>
        <div className={`${isBlurEnabled ? "" : "hidden"} w-full h-screen fixed top-30 z-5 backdrop-blur-xl`}></div>
        <div className="lg:max-w-[1340px] flex flex-col max-w-[560px] w-full mx-auto lg:pl-5 gap-12 relative">
            <Header activeMenu="My Blogs"/>

            <div className="flex flex-col gap-8 lg:w-full md:w-100 w-80 lg:ml-4 mx-auto">
              <div className='flex flex-col items-center justify-center mx-auto'><p className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-[20px] font-medium`}>{email}</p></div>
              <div className="flex flex-wrap gap-13 lg:justify-start justify-center">
                { authorBlogs?.map(b => <Blogs key={b._id} blog={b}/>)}
              </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Author
