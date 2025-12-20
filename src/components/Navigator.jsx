import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import BlogDetails from '../pages/BlogDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Author from '../pages/Author'
import WriteBlog from '../pages/WriteBlog'

const Navigator = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/blog-details/:id' element={ <BlogDetails /> }/>
        <Route path='/signin' element={ <Login /> } />
        <Route path='/register' element={<Register />} />
        <Route path='/my-blogs/:userId' element={<Author />} />
        <Route path='/write-blog' element={<WriteBlog />} />
    </Routes>
  )
}

export default Navigator
