import React, { useState } from 'react'
import { useStore } from '../store/Store'
function Landing() {

  const submitHandler = (e) => {
    e.preventDefault()
  }
  
  const [isLogin, setIsLogin] = useState(false)
  const { themeColor } = useStore()

  return (
    <div>
      {/* form section  */}
      <div className={`${themeColor ? 'bg-neutral-600' : 'bg-green-200'} m-3 rounded-lg px-5 p-2 shadow-lg min-w-1/30 max-w-md h-fit`}>
        <form onSubmit={(e) => submitHandler(e)} action="" method="post" className='flex flex-col justify-center items-center m-5'>
            
          <div className="relative w-full mb-6">
            <div className='w-full border-t'></div>
           
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${themeColor ? 'bg-neutral-600' : 'bg-green-200'} text-center px-4 py-1 rounded font-semibold`}>{isLogin? 'Login' :'Register'}</div>
          </div>
          {/* Name */}
          {!isLogin && <div>
            <label className='block text-sm font-medium'>Full Name</label>
            <input className='m-2 bg-stone-200 text-black placeholder:text-black/50 p-1.5 rounded' type='name' placeholder='name' />
          </div>}
          
          {/* email */}
          <div>
            <label className='block text-sm font-medium'>Email Address</label>
            <input className='m-2 bg-stone-200 text-black placeholder:text-black/50 p-1.5 rounded' type='email' placeholder='email' />
          </div>

        {/* password */}
          <div>
            <label className='block text-sm font-medium'>Password</label>
            <input className='m-2 bg-stone-200 text-black placeholder:text-black/50 p-1.5 rounded' type='password' placeholder='password' />
          </div>
          {/* Confirm password */}
            {!isLogin && <div>
            <label className='block text-sm font-medium'>Confirm Password</label>
            <input className='m-2 bg-stone-200 text-black placeholder:text-black/50 p-1.5 rounded' type='password' placeholder='password' />
          </div>}
          
              {/* submit btn */}
          <button className={`${themeColor ? 'bg-neutral-700 hover:bg-neutral-800 ' : 'bg-green-100 hover:bg-emerald-200'} p-2 rounded-lg shadow m-3 `} type="submit">{ isLogin? 'Login' :'Create Acount'}</button>
        </form>
        <div className='flex'>
          <p className='text-center text-sm m-1'>
            {isLogin? 'Don not have an account?': 'Already have an account?'}
            </p>
             <button
            onClick={() => setIsLogin(!isLogin)}
             className='text-center font-bold cursor-pointer text-blue-400'> {isLogin? 'Sign up' : 'Sign in'}</button>
        </div>

        {/* Divider */}

        <div className="relative my-3">

          <div className='w-full border-t'></div>
          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${themeColor ? 'bg-neutral-600' : 'bg-white'} text-center px-4 py-1 rounded text-sm`}>Or continue with</div>
        </div>
        {/* Social Login Buttons */}
        <div className="grid mt-5 grid-cols-2 gap-4 mb-6">
          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 bg-white transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 bg-white transition">
            <svg className="w-5 h-5" fill='black' viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.916 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">GitHub</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Landing