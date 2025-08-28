import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked' ;
const GeneratingLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
    <div className="flex flex-col items-center">
      <svg className="animate-spin h-8 w-8 text-[#5044E5] mb-2" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      <span className="text-sm text-[#5044E5] font-medium">Generating blog content...</span>
    </div>
  </div>
);

const PublishBlog = () => {
    const [image,setImage] = useState(false);
    const [title,setTitle] = useState("");
    const [subTitle,setSubTitle] = useState("");
    const [category,setCategory] = useState("startup");
    const [isPublished,setIsPublished] = useState(false);
    const [loading,setLoading] = useState(false);
    const {axios} = useAppContext() ;
    const [isAdding,setIsAdding] = useState(false);
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const onSubmitHandler = async (e)=>{
       try{
        e.preventDefault();
        setIsAdding(true);


        const blog = {
            title, subTitle,description: quillRef.current.root.innerHTML,
            category,isPublished
        }
        const formData = new FormData();
        formData.append('blog', JSON.stringify(blog));
        formData.append('image', image); 

        const {data} = await axios.post('api/blog/publishBlog',formData);
        if(data.success){
            toast.success(data.message);
            setImage(false);
            setTitle('');
            quillRef.current.root.innerHTML = '';
            setCategory('Startup')
            setSubTitle('');
        }
        else{
            toast.error(data.message);
        }
       }catch(error){
            toast.error(error.message);
       }finally{
        setIsAdding(false);
       }

    }
 
    const generateContent = async ()=>{
     if(!title) return toast.error('Please enter a title');
     try{
     setLoading(true);
     const prompt = `Write a detailed, well-structured blog post about "${title}". 
Include an engaging introduction, several informative sections, and a conclusion. 
Use clear headings, bullet points where appropriate, and ensure the information is accurate and up-to-date. 
The tone should be friendly and informative. 
If relevant, cite reputable sources or provide links for further reading.`;
     const {data} = await axios.post('/api/blog/generate',{prompt});
     if(data.success){
        quillRef.current.root.innerHTML = parse(data.content);
     }
     else{
        toast.error(data.message);
     }
     }catch(error){
        toast.error(error.message);
     }finally{
        setLoading(false);
     }
    }

    useEffect(()=>{
            if(!quillRef.current && editorRef.current){
                quillRef.current = new Quill(editorRef.current,{theme:'snow'})
            }
    } ,[])
  return (
   <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
       
       <p>Upload thumbnail</p>
       <label htmlFor="image">
           <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer' />
           <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label> 
         
        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Type Here...' required 
        className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' 
        onChange={(e)=>setTitle(e.target.value)} value={title}/> 
        <p className='mt-4'>Blog Subtitle</p>
        <input type="text" placeholder='Type Here...' required 
        className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' 
        onChange={(e)=>setSubTitle(e.target.value)} value={subTitle}/> 

       <p className='mt-4'>Blog Description</p>
       <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
        <div ref={editorRef}></div>
        <button
            disabled={loading}
            type='button'
            onClick={generateContent}
            className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
          >
            Generate with AI
          </button>
          {loading && <GeneratingLoader />}
       </div>
       <p className='mt-4'>Blog Category</p>
       <select onChange={(e)=>{setCategory(e.target.value)}} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded ' >
        <option value="">Select Category</option>
        {blogCategories.map((item,index)=>{
            return <option key={index} value={item}>{item}</option>
        })}
       </select>

       <div className='flex gap-2 mt-4'>
        <p>Publish Now</p>
        <input type="checkbox" checked={isPublished}  className='scale-125 cursor-pointer' onChange={(e)=> setIsPublished(e.target.checked)}/>
       </div>
       <button disabled={isAdding} type='submit' className='mt-8 w-40 h-10 bg-[#5044E5] text-white rounded cursor-pointer text-sm'> {isAdding ?'Publishing...' : 'Publish' }</button>
      </div>
   </form>
  )
}

export default PublishBlog
