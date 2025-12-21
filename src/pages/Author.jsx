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
  const [ isSelected, setIsSelected] = useState(false)
  const [selectedIds, setSelectedIds] = useState([]);
  const [ isThereBlogs, setIsThereBlogs ] = useState(false)

  const toggleSelect = (id, checked) => {
    setSelectedIds(prev =>
      checked ? [...prev, id] : prev.filter(x => x !== id)
    );
  };

  const deleteSelectedBlogs = async () => {
    if(selectedIds.length === 0) return;
    for (const id of selectedIds) {
      try {
        const {data, statusText} = await api.delete(`blogs/${id}`);

        if (statusText === "OK"){
          alert("Deleted successfully")
          window.location.reload()
        }
      } catch (error) {
        console.error(error)
      }
    }
    setSelectedIds([]);
    getAuthorBlogs(); // refresh list
  };

  const getAuthorBlogs = async () => {
    try {
      const { data, statusText } = await api.get(`blogs/user/me`)

      if (data.blogs.length > 0) setIsThereBlogs(true)

      if (statusText === "OK") setAuthorBlogs(data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAuthorBlogs()
    setEmail(localStorage.getItem("email"))
  }, [])
  
  useEffect(() => {
    if (!isSelected) {
      setSelectedIds([]);
      console.log(selectedIds)
    }
  }, [isSelected]);

  useEffect(() => {
    getAuthorBlogs
  }, [accessToken])

  return (
    <>
        <div className={`${isBlurEnabled ? "" : "hidden"} w-full h-screen fixed top-30 z-5 backdrop-blur-xl`}></div>
        <div className="lg:max-w-[1340px] flex flex-col max-w-[560px] w-full lg:pl-5 gap-12 relative mx-auto">
            <Header activeMenu="My Blogs"/>

            <div className="flex flex-col gap-8 lg:w-full md:w-100 w-80 lg:ml-4 mx-auto">
              <p className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-[20px] font-medium text-center`}>{email}</p>
              <div className='flex justify-end gap-10 xl:mr-15 lg:mr-100 mr-5'>
                  { isThereBlogs ? <p className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-right  lg:text-[16px] md:text-[14px] text-[12px] font-bold cursor-pointer`} onClick={(e) => {setIsSelected(!isSelected)}}> {isSelected ? "Deselect" : "Select"}</p> : ""}
                  { isSelected ? <p className={`${isDarkModeActive ? "text-white" : "text-[#181A2A]"} text-right  lg:text-[16px] md:text-[14px] text-[12px] font-bold cursor-pointer`} onClick={deleteSelectedBlogs}>Delete</p> : ""}
              </div>
              
              <div className="flex flex-wrap gap-13 lg:justify-start justify-center">
                  { isThereBlogs ? authorBlogs?.map(b => <Blogs key={b._id} blog={b} isSelectPressed = {isSelected} selectedIds={selectedIds} toggleSelect={toggleSelect}/>) : <p className='text-center mx-auto mt-5 text-[20px] text-red-600'>No any blogs</p>}
              </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Author
