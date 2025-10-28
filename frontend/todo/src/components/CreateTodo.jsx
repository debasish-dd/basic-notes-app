import { useState } from 'react'
import { useStore, useTodoStore } from '../store/Store'
import { Link } from 'react-router-dom';

export default function CreateTodo() {

  const createTodo  = useTodoStore((state)=>state.createTodo)
  const themeColor = useStore(state => state.themeColor);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')


  const submitHandler = (e)=>{
   if (title.length>0 && description.length>0) {
     createTodo({
       title,
       description
     })
    
   }

  
    
  }
  return (
    <div className='flex items-center justify-center flex-col m-8'>

      <div className="relative w-90 group m-5 ">
    
        <input 
        onChange={(e)=>{setTitle(e.target.value)}}
        value={title}
        type="text"
         id="input" 
         placeholder className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent" />
        <label htmlFor="input" className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-500 peer-focus:font-semibold cursor-text">
          Title
        </label>
      </div>
      
        <textarea
        onChange={(e)=>{setDescription(e.target.value)}}
        value={description}
         name=""
          id="" 
          rows={8} cols={80} placeholder='description' className={`rounded-lg p-3 bg-yellow-50 text-black placeholder:text-black shadow-lg `}>
        </textarea>

        <Link 
        to={'/'}
        onClick={submitHandler}
        className={`${themeColor ? 'bg-neutral-900 hover:bg-neutral-600 text-white' : 'bg-emerald-500 hover:bg-emerald-800 hover:text-white'} font-semibold  m-5 p-2 px-3 rounded shadow`}>Submit</Link>

    </div>
  )
}
