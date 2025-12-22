import React, { useEffect, useState } from 'react'
import logo from '../assets/Union.png'
import search from '../assets/search-outline.png'
import sunny from '../assets/sunny.png'
import logoWhite from '../assets/Union-white.png'
import userWhite from '../assets/user-icon-white.png'
import userDark from '../assets/user-icon-dark.png'
import { useDarkMode } from '../stores/darkModeStore'
import { Link, useNavigate } from 'react-router-dom'
import { useTokens } from '../stores/tokenStore'
import api from '../utils/axios'
import { formatDate } from '../stores/formattingDate'
import Search from './Search'
import { useBlur } from '../stores/blurStore'
import { useCategory } from '../stores/categoryStore'
import { useSearch } from '../stores/searchStore'


const Header = ({activeMenu, state}) => {
    const navigate = useNavigate()
    const {isDarkModeActive, toggleDarkMode} = useDarkMode()
    const [hamburgerOpened, setHamburgerOpened] = useState(false)
    const [open, setOpen] = useState(false);
    const [menu] = useState(activeMenu)
    const [menuAnimation, setMenuAnimation] = useState("")
    const { accessToken, clearTokens } = useTokens()
    const [searchTerm, setSearchTerm] = useState("")
    const [searchedBlogs, setSearchedBlogs] = useState([])
    const { isBlurEnabled, enableBlur, disableBlur } = useBlur()
    const { setCategory } = useCategory()
    const { searchReload, setSearchReload } = useSearch()
    const [isUserPressed, setIsUserPressed] = useState(false)

    const checkAccessToken = (page) => {
        if(accessToken) navigate(page)
        else navigate('/signin')
    }

    const getSearchedBlogs = async () => {
        try {
            const {data, statusText} = await api.get(`blogs?search=${searchTerm}`)
            console.log(data)

            const formattedBlog = data.blogs.map(blog => ({
                ...blog,
                formattedDate: formatDate(blog.createdAt)
            }))
            if (statusText === "OK"){
                setSearchedBlogs(formattedBlog);
            }
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (!searchTerm.trim()) return;
        getSearchedBlogs()
    }, [searchTerm])

    useEffect(() => {
        setSearchTerm("")
        disableBlur();
        setSearchReload(false)
    }, [searchReload])

    useEffect(() => {
        if(!isBlurEnabled) setSearchTerm("")
    }, [isBlurEnabled])

    return (
        <>
            <div className="w-full h-[100px] flex lg:gap-[35px] md:gap-5 gap-[5px] py-[30px] px-6 lg:px-6 items-center z-30 justify-center">
                <div className="flex lg:gap-3 md:gap-2 gap-1 justify-center items-center">
                    <img className="md:w-9 md:h-9 w-4 h-4" src={isDarkModeActive ? logoWhite : logo} alt="" /> 
                    <p className={`${isDarkModeActive ? "text-white" : "text-[#141624]"} lg:text-[16px] md:text-[14px] text-[8px]`}>Meta <span className="font-medium">Blog</span></p>                    
                </div>

               
                <button
                    disabled={isBlurEnabled} // disables the button if isBlurEnabled is true
                    onClick={() => {
                        setOpen(!open);
                        setHamburgerOpened(!hamburgerOpened);
                    }}
                    className={`${
                        hamburgerOpened && searchTerm === "" ? "mt-18 bg-[#141624]" : "mt-0 bg-none"
                    } flex h-14 rounded-[10px] -ml-5 md:ml-0 lg:hidden cursor-pointer flex-col items-center px-2 pr-2 w-17 justify-center gap-[5px] relative transition-all duration-500`}
                >
                    <span
                        className={`${
                            isDarkModeActive ? "bg-white" : "bg-[#141624]"
                        } ${hamburgerOpened && searchTerm === "" ? "bg-white" : "bg-[#141624]"} block h-0.5 md:w-[26px] w-[15px] rounded transform transition duration-500 ${
                            open && searchTerm === "" ? "rotate-45 md:translate-y-2 translate-y-2" : ""
                        }`}
                    />
                    <span
                        className={`${
                            isDarkModeActive ? "bg-white" : "bg-[#141624]"
                        } block h-0.5 md:w-[26px] w-[15px] rounded transition duration-500 ${
                            open && searchTerm === "" ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`${
                            isDarkModeActive ? "bg-white" : "bg-[#141624]"
                        } ${hamburgerOpened && searchTerm === "" ? "bg-white" : "bg-[#141624]"} block h-0.5 md:w-[26px] w-[15px] rounded transform transition duration-500 ${
                            open && searchTerm === "" ? "-rotate-45 md:translate-y-0 -translate-y-2" : ""
                        }`}
                    />
                </button>

                
            
                <div className={`${isDarkModeActive ? "text-white" : "text-[#3B3C4A]"} relative xl:text-[16px] lg:text-[14px] xl:ml-20 lg:-ml-15 text-[12px] mx-auto lg:flex hidden items-center justify-evenly w-[567px] h-6`}>
                    <Link onClick={(e) => {setCategory('')}} to="/" className={`${menu === "Home" ? isDarkModeActive ? "border-b-2 border-white" : "border-b-2 border-[#141624]" : ""} cursor-pointer pb-2 mt-2`} onMouseEnter={(e) => { menu==="Home" ? setMenuAnimation("") : setMenuAnimation("homeHovered") }} onMouseLeave={(e) => setMenuAnimation("")}>Home</Link>
                    <div className={`${menuAnimation === "homeHovered" ? "xl:w-[43px] lg:w-[37.5px]" : "w-0"} bg-[#4B6BFB] h-0.5 absolute top-[30px] xl:left-[63px] lg:left-[69.8px] transition-all duration-400`}></div>
                    
                    <button onClick={() => checkAccessToken("/write-blog")} className={`${menu === "Write a Blog" ? isDarkModeActive ? "border-b-2 border-white" : "border-b-2 border-[#141624]" : ""} cursor-pointer pb-2 mt-2`} onMouseEnter={(e) => { menu==="Write a Blog" ? setMenuAnimation("") : setMenuAnimation("writeBlogHovered") }} onMouseLeave={(e) => setMenuAnimation("")}>Write a Blog</button>
                    <div className={`${menuAnimation === "writeBlogHovered" ? "xl:w-[86.7px] lg:w-[75.5px]" : "w-0"} bg-[#4B6BFB] h-0.5 absolute top-[30px] xl:left-[169.8px] lg:left-[177.5px] transition-all duration-400`}></div>
                    
                    <button onClick={() => checkAccessToken(`/my-blogs/${accessToken}`)} className={`${menu === "My Blogs" ? isDarkModeActive ? "border-b-2 border-white" : "border-b-2 border-[#141624]" : ""} cursor-pointer pb-2 mt-2`} onMouseEnter={(e) => { menu==="My Blogs" ? setMenuAnimation("") : setMenuAnimation("myBlogsHovered") }} onMouseLeave={(e) => setMenuAnimation("")}>My Blogs</button>
                    <div className={`${menuAnimation === "myBlogsHovered" ? "xl:w-[65px] lg:w-[58px]" : "w-0"} bg-[#4B6BFB] h-0.5 absolute top-[30px] xl:left-[320.6px] lg:left-[322px] transition-all duration-400`}></div>
                    
                    <Link className={`${menu === "Contact" ? isDarkModeActive ? "border-b-2 border-white" : "border-b-2 border-[#141624]" : ""} cursor-pointer pb-2 mt-2`} onMouseEnter={(e) => { menu==="Contact" ? setMenuAnimation("") : setMenuAnimation("contactHovered") }} onMouseLeave={(e) => setMenuAnimation("")}>Contact</Link>
                    <div className={`${menuAnimation === "contactHovered" ? "xl:w-[55px] lg:w-12" : "w-0"} bg-[#4B6BFB] h-0.5 absolute top-[30px] xl:left-[448.5px] lg:left-[449px] transition-all duration-400`}></div>
                </div>

                <div className='flex justify-center lg:ml-5 ml-[-30px] items-center w-[166px] h-9'>
                    <input value={searchTerm} type="text" placeholder='Search' className={`${isDarkModeActive ? "bg-[#242535] text-white" : "bg-white text-[#242535]"} outline-none placeholder-[#A1A1AA] lg:h-10 rounded-[5px] h-[30px] xl:w-[200px] lg:w-[120px] xl:-ml-80 lg:-ml-50 w-20 lg:text-[16px] text-[12px] py-2 px-4 mr-3 trasition-all duration-500`} onChange={(e) => {
                        setSearchTerm(e.target.value)
                        e.target.value.trim() === "" ? disableBlur() : enableBlur()
                    }}/>
                    <img src={search} alt="" className="w-4 h-4"/>
                    {searchTerm && (<Search searchTxt={searchTerm} blogs={searchedBlogs} />)}
                </div>

                <button onClick={toggleDarkMode} className={`${isDarkModeActive ? "bg-[#4B6BFB]" : "bg-[#cbcbcf]"} md:w-12 w-12 h-7 cursor-pointer shadow-sm lg:-ml-24 -ml-2.5 mshadow-black/40 rounded-[100px] relative p-0.5 transition-all duration-500`}>
                    <div className={`${isDarkModeActive ? "translate-x-[clamp(18px,5vw,19px)]" : "translate-x-0"} w-6 h-6 rounded-[50%] bg-white flex absolute p-[5.71px] shadow-lg shadow-black/50 transition-all duration-400 top-0.5`}>
                        <img src={sunny} alt="" />
                    </div>
                </button>

                <Link to='/signin' className={`${!accessToken ? "block" : "hidden"} ${isDarkModeActive ? "bg-white text-[#141624]" : "bg-[#141624] text-white"} rounded-[10px] px-2 md:w-auto w-12 py-2 text-regular md:px-3 cursor-pointer bg-[#141624] lg:text-[14px] md:text-[10px] md:ml-[-5px] text-[8px] xl:text-[16px] lg:ml-0 ml-5`}>Sign In</Link>
                { accessToken ? <div className={`${isDarkModeActive ? "bg-white hover:bg-[#b8bbce]" : "bg-[#141624] hover:bg-[#283174]"} rounded-[50%] md:w-10 md:h-10 w-8 h-8 flex flex-col justify-center items-center relative cursor-pointer transition-all duration-300`} onClick={(e) => {setIsUserPressed(!isUserPressed)}} >
                    <img className='md:w-6 md:h-6 w-5 h-5 cursor-pointer' src={isDarkModeActive ? userDark : userWhite} alt="" />
                    { isUserPressed ? <div className={`${isDarkModeActive ? "bg-white text-[#141624] hover:bg-[#b8bbce]" : "bg-[#141624] text-white hover:bg-[#283174]"} xl:w-25 lg:w-20 md:w-20 md:h-10 w-17 h-7 lg:text-[16px] md:text-[14px] text-[12px] bg-[#141624] absolute md:top-12 top-9 flex flex-col justify-center items-center transition-all duration-300`}>
                        <button className='cursor-pointer  w-full h-full' onClick={(e) => {clearTokens(); navigate('/'); window.location.reload()}}>Sign out</button>
                    </div> : ""}
                </div> : ""}
            </div>

            <div className={`lg:hidden
                w-full bg-[#141624] p-4 mx-auto overflow-hidden
                transition-[max-height] duration-1000 mt-[-50px]
                ${hamburgerOpened && searchTerm === '' ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="lg:text-[16px] text-[20px] text-white mx-auto flex flex-col items-center justify-center w-full gap-5">
                    <Link to="/" className={`${menu === "Home" ? "bg-gray-700 shadow-xl shadow-black scale-102" : "bg-gray-500/20 scale-100"} cursor-pointer p-4 w-full text-center hover:bg-gray-500/40 hover:shadow-xl hover:scale-102 hover:shadow-black`}>Home</Link>
                    <button onClick={() => checkAccessToken("/write-blog")} className={`${menu === "Write a Blog" ? "bg-gray-700 shadow-xl shadow-black scale-102" : "bg-gray-500/20 scale-100"} cursor-pointer p-4 w-full text-center hover:bg-gray-500/40 hover:shadow-xl hover:scale-102 hover:shadow-black`}>Write a Blog</button>
                    <button onClick={() => checkAccessToken(`/my-blogs/${accessToken}`)} className={`${menu === "My Blogs" ? "bg-gray-700 shadow-xl shadow-black scale-102" : "bg-gray-500/20 scale-100"} cursor-pointer p-4 w-full text-center hover:bg-gray-500/40 hover:shadow-xl hover:scale-102 hover:shadow-black`}>My Blogs</button>
                    <Link to="" className={`${menu === "Contact" ? "bg-gray-700 shadow-xl shadow-black scale-102" : "bg-gray-500/20 scale-100"} cursor-pointer p-4 w-full text-center hover:bg-gray-500/40 hover:shadow-xl hover:scale-102 hover:shadow-black`}>Contact</Link>
                </div>
            </div>
        </>
    )
}

export default Header
