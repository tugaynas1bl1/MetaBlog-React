import React from 'react'
import sun from '../assets/Sun.png'
import moon from '../assets/Moon.png'
import stars from '../assets/Stars.jpg'
import { useDarkMode } from '../stores/darkModeStore'

const AnimationDarkMode = () => {
    const { isDarkModeActive } = useDarkMode()
    return (
        <div>
            <img className={`${isDarkModeActive ?  "-translate-x-700 translate-y-400 rotate-180" : "rotate-20 block"} -top-30 overflow-hidden -right-20 w-50 opacity-60 h-50 absolute transition-all duration-2000`} src={sun} alt="" />
            <img className={`${isDarkModeActive ?  "-translate-x-35 translate-y-35 rotate-45" : ""} -top-42 -right-42 w-30 h-30 opacity-50 absolute transition-all duration-1500`} src={moon} alt="" />
        </div>
    )
}

export default AnimationDarkMode
