import React, { use, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { blog_data } from '../assets/assets';
import Navbar from '../components/Navbar';

const Blog = () => {
  const {id}= useParams();
  const [data,setData]= useState(null);
  const fetchBlogData= async()=>{
    const data=blog_data.find(item=>item>id===id)
    setData(data);
  }
  useEffect(()=>{
    fetchBlogData()},[])
  return data ?(
    <div>
    <Navbar></Navbar>
      <div>

      </div>
      <div>

      </div>
    </div>
  ):<div>Loading....</div>

}

export default Blog
