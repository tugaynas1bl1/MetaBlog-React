import React, { useEffect } from 'react'
import Home from './pages/Home'
import { useDarkMode } from './stores/darkModeStore'
import BlogDetails from './pages/BlogDetails'
import Navigator from './components/Navigator'
import Search from './components/Search'
import Header from './components/Header'
import { useBlur } from './stores/blurStore'
import AnimationDarkMode from './components/AnimationDarkMode'
import { useTokens } from './stores/tokenStore'




const App = () => { 

  const { isBlurEnabled } = useBlur()
  const { isDarkModeActive } = useDarkMode()
  const { clearTokens } = useTokens()

  useEffect(() => {
    isBlurEnabled ? document.documentElement.style.overflow = "hidden" : document.documentElement.style.overflow = "auto"
  }, [isBlurEnabled])

  return (
    <div className={`${isDarkModeActive ? "bg-[#181A2A]" : "bg-white"} w-full h-full transition-all duration-500 relative overflow-hidden`}>
        <AnimationDarkMode />
        <Navigator />
        <div className={`${isBlurEnabled ? "" : "hidden"} w-full h-full fixed top-30 z-5 backdrop-blur-xl`}></div>
    </div>
  )
}

export default App

