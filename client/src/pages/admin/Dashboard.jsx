import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from './BlogTableItem'

const Dashboard = () => {
    const [dashboardData,setDashboardData]= useState({
        blogs:0,
        comments:0,
        drafts:0,
        recentBlogs:[]
    })
    const fetchDashboard= async()=>{
        setDashboardData(dashboard_data);
    }
    useEffect(()=>{
        fetchDashboard();
    },[])
  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
        <div className='flex felx-wrap gap-4'>
            <div className='flex items-center gap-4 bg-white 
            p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_1}/>
                <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
                    <p className='tect-gray-400 font-light'> Blogs</p>
                </div>
            </div>
            <div className='flex items-center gap-4 bg-white 
            p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_2}/>
                <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
                    <p className='tect-gray-400 font-light'> Comments</p>
                </div>
            </div>
            <div className='flex items-center gap-4 bg-white 
            p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_3}/>
                <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
                    <p className='tect-gray-400 font-light'> Drafts</p>
                </div>
            </div>
        </div>
        <div>
            <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
                <img src={assets.dashboard_icon_4}/>
                <p>Latest Blogs</p>
            </div>
            <div className='relative max-w-4xl overflow-x-auto 
            shadow rounded-lg scrollbar-hide bg-white'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-600 text-left uppercase'>
                        <tr>
                            <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                            <th scope='col' className='px-2 py-4'>Blog Title</th>
                            <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                            <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                            <th scope='col' className='px-2 py-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboard_data.recentBlogs.map((blog,index)=>{
                            return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index+1}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
      
    </div>
  )
}

export default Dashboard
