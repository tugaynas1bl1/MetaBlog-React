import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import logo from '../assets/Union.png'
import logoWhite from '../assets/Union-white.png'
import { useDarkMode } from '../stores/darkModeStore'
import sunny from '../assets/sunny.png'
import { Link, useNavigate } from 'react-router-dom'
import { useTokens } from '../stores/tokenStore'
import api from '../utils/axios'


const Register = () => {
    const navigate = useNavigate()
    const{ isDarkModeActive, toggleDarkMode } = useDarkMode()
    const { setRefreshToken, setAccessToken } = useTokens()
    const [registerData, setRegisterData] = useState({firstname: "", lastname: "", email: "", password:""})

    const handleInput = async (title, value) => {
            setRegisterData(prevState => ({
                ...prevState,
                [title]: value
            }))
    }
    
    const handleRegister = async () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (registerData.firstname.trim()  === ''){
            alert("Please fill the firstname field")
        }

        else if (registerData.lastname.trim() === ''){
            alert("Please fill the lastname field")
        }

        else if (registerData.email.trim() === ''){
            alert("Please fill the email field")
        }

        else if (!emailRegex.test(registerData.email.trim())){
            alert("Please type correct email syntax")
        }   

        else if (registerData.password.trim() === ''){
            alert("Please fill the password field")
        }
        
        else {
            try {
                const { data, statusText } = await api.post('auth/register', registerData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (statusText === "OK"){
                    setAccessToken(data.accessToken)
                    setRefreshToken(data.refreshToken)
                    localStorage.setItem("email", registerData.email.trim())
                    navigate('/signin')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
    return (
        <div className='lg:max-w-[1340px] flex flex-col max-w-[560px] w-full mx-auto lg:pl-5 gap-12'>
            <div className='flex justify-between py-10 lg:px-0 px-12'>
                <div className="flex gap-3 justify-center items-center">
                    <img className="w-9 :h-9" src={isDarkModeActive ? logoWhite : logo} alt="" /> 
                    <p className={`${isDarkModeActive ? "text-white" : "text-[#141624]"} text-[16px]`}>Meta <span className="font-medium">Blog</span></p>                    
                </div>

                <button onClick={toggleDarkMode} className={`${isDarkModeActive ? "bg-[#4B6BFB]" : "bg-[#E8E8EA]"} md:w-12 w-12 h-7 cursor-pointer shadow-sm lg:-ml-24 -ml-2.5 mshadow-black/40 rounded-[100px] relative p-0.5`}>
                    <div className={`${isDarkModeActive ? "translate-x-[clamp(18px,5vw,19px)]" : "translate-x-0"} w-6 h-6 rounded-[50%] bg-white flex absolute p-[5.71px] shadow-md shadow-black/40 transition-all duration-400 top-0.5`}>
                        <img src={sunny} alt="" />
                    </div>
                </button>
            </div>

            <div className='flex flex-col justify-center items-center gap-[111px] mb-10'>
                <h1 className={`${isDarkModeActive ? "text-white" : "text-[#232536]"} text-[48px] font-bold`}>Register</h1>

                <div className='flex flex-col max-w-[769px] md:w-full h-fit'>
                    <input value={ registerData.firstname } className={`${isDarkModeActive ? "placeholder-white text-white": "placeholder-[#232536] text-[#232536]"} border border-[#6D6E7680] rounded-xs outline-none mb-[33px] py-6 px-6 md:h-fit h-2.5`} placeholder='Enter your first name' type="text" onChange={ (e) => {
                        handleInput("firstname", e.target.value)
                    }} />
                    <input value={ registerData.lastname } className={`${isDarkModeActive ? "placeholder-white text-white": "placeholder-[#232536] text-[#232536]"} border border-[#6D6E7680] rounded-xs outline-none mb-[33px] py-6 px-6 md:h-fit h-2.5`} placeholder='Enter your last name' type="text" onChange={ (e) => {
                        handleInput("lastname", e.target.value)
                    }} />
                    <input value={ registerData.email } className={`${isDarkModeActive ? "placeholder-white text-white": "placeholder-[#232536] text-[#232536]"} border border-[#6D6E7680] rounded-xs outline-none mb-[33px] py-6 px-6 md:h-fit h-2.5`} placeholder='Enter your email' type="email" onChange={ (e) => {
                        handleInput("email", e.target.value)
                    }}/>
                    <input value={ registerData.password } className={`${isDarkModeActive ? "placeholder-white text-white": "placeholder-[#232536] text-[#232536]"} border border-[#6D6E7680] rounded-xs outline-none mb-[45px] py-6 px-6 md:h-fit h-2.5`} placeholder='Enter your password' type="password" onChange={ (e) => {
                        handleInput("password", e.target.value)
                    }}/>
                    <p className={`${isDarkModeActive ? "text-white" : "text-[#696A75]"} mb-[22px] md:text-[16px] text-[10px] md:ml-5 ml-1`}>You already have an account? <Link to="/signin" className='underline font-bold cursor-pointer'>login to existing account</Link></p>
                    <button onClick={handleRegister} to="/signin" className='bg-[#FFD050] md:text-[24px] cursor-pointer hover:bg-[#ffbc04] hover:rounded-tl-[50px] hover:rounded-br-[50px] hover:rounded-tr-[50px] hover:rounded-bl-[50px] text-center text-[14px] text-[#232536] font-bold md:py-5 py-3.5 md:h-fit h-[45px] transition-all duration-500'>Register</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register
