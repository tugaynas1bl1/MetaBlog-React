import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Thumbnail from '../components/Thumbnail'
import Blogs from '../components/Blogs'
import Footer from '../components/Footer'
import api from '../utils/axios'
import { formatDate } from '../stores/formattingDate'
import { useLocation } from 'react-router-dom'
import Search from '../components/Search'
import { useBlur } from '../stores/blurStore'
import { useCategory } from '../stores/categoryStore'

const Home = ({isSearchEnabled}) => {
  const [blogs, setBlogs] = useState([])
  const [blogLimit, setBlogLimit] = useState(3)
  const [blogsLength, setBlogsLength] = useState(0)
  const { isBlurEnabled } = useBlur()
  const location = useLocation()
  const {category} = useCategory()

  const getBlogs = async (cat) => {
    console.log(category)
      try {
          const { data, statusText } = await api.get(`${cat ? `blogs?category=${category}&limit=${blogLimit}` : `blogs?limit=${blogLimit}`}`)
          const { data: data2, statusText: statusText2 } = await api.get(`${cat ? `blogs?category=${category}&limit` : `blogs?limit`}  `);

          
            setBlogsLength(data.blogs.length)
            console.log(data.blogs)
          
          const formattedBlogs = data.blogs.map(blog => ({
              ...blog,
              formattedDate: formatDate(blog.createdAt)
          }))

          if (statusText === "OK" && statusText2 === "OK"){
            setBlogs(formattedBlogs)
            setBlogsLength(data2.blogs.length);
            console.log(blogs.length)
          }          

      } catch (error) {
          console.error(error)
      }
  }

  useEffect(() => {
    getBlogs(category)
  }, [category, blogLimit])


  return (
    <>
    <div className={`${isBlurEnabled ? "" : "hidden"} w-full h-screen fixed top-30 z-5 backdrop-blur-xl`}></div>
    <div className="lg:max-w-[1340px] flex flex-col max-w-[560px] w-full mx-auto lg:pl-5 gap-12 relative">
      <Header activeMenu="Home"/>
      <Thumbnail blog={blogs[0]}/>
      <div className="flex flex-col gap-8 lg:w-full md:w-100 w-80 lg:ml-4 mx-auto">
          <h1 className='md:text-[24px] text-[20px] font-bold text-white md:ml-0 pl-2'>Latest Post</h1>
          <div className="flex flex-wrap gap-13 lg:justify-start justify-center">
          {blogs.map(b => <Blogs key={b._id} blog={b}/>)}
          </div>
          <button onClick={() => {blogLimit >= blogsLength ? setBlogLimit(prev => prev = 3) : setBlogLimit(prev => prev + 6)}} className={` w-[123px] h-12 mx-auto text-[16px] font-medium text-[#696A75] rounded-md border border-[#696A754D] bg-none px-5 py-3 cursor-pointer hover:shadow-md hover:shadow-[#4B6BFB]/70`}>{blogLimit >= blogsLength ? "Show less" : "Load more"}</button>
      </div>
    </div>
    

    <Footer />
    </>
  )
}
export default Home
