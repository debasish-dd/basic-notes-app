import React from 'react'
import { useStore } from '../store/Store'
import { Link, Outlet } from 'react-router-dom'

function Navbar() {
    const { themeColor, updateThemeColor } = useStore()

    const themeToggler = (e) => {
        updateThemeColor(e.target.checked)
    }
    return (
        <header className={`${themeColor ? "bg-stone-900" : 'bg-lime-200'} w-full h-20 p-5 flex items-center justify-between shadow`}>
            <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-neutral-700">
                <input
                    defaultChecked
                    onChange={themeToggler}
                    className="peer sr-only"
                    type="checkbox"
                />
                <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent" />
            </label>
            <Link to={''} className={`${themeColor ? 'bg-transparent hover:bg-stone-400/20 outline-2 focus:outline-offset-1 focus:outline-gray-400' : "bg-transparent text-black hover:bg-lime-800/20 outline-2 focus:outline-offset-1 focus:outline-emerald-900"} cursor-pointer w-20 text-center h-7 rounded`}> Home </Link>

            <Link
                to="/create-todo"
                className={`${themeColor ? 'bg-neutral-800 hover:bg-stone-900 focus:outline-2 focus:outline-offset-1 focus:outline-gray-400' : "bg-lime-800 hover:bg-lime-900 focus:outline-1 focus:outline-offset-1 focus:outline-emerald-900"} text-white p-3 m-3 rounded-xl cursor-pointer`}
                type="button" >
                Add Todo
            </Link>
        </header>
        
    )
}

export default Navbar       