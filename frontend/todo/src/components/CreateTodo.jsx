import React from 'react'
import { useStore } from '../store/Store'

export default function CreateTodo() {

    const { themeColor } = useStore()

  return (
    <div className='flex justify-center m-8'>
       <div className="relative w-80 group">
      <span className={`absolute -left-0.5 top-2 bottom-2 w-1.5 rounded 
      ${ themeColor? 'bg-gradient-to-b from-gray-500 to-stone-800' : 'bg-gradient-to-b from-emerald-500 to-lime-500'} opacity-70 transition-all duration-300 group-focus-within:opacity-100`} />
      <input type="text" id="input" placeholder className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent" />
      <label htmlFor="input" className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-500 peer-focus:font-semibold cursor-text">
        Title
      </label>
    </div>
   
    </div>
  )
}
