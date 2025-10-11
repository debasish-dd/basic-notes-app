import { useState } from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import { useStore } from './store/Store.js'
import CreateTodo from './components/CreateTodo.jsx';
import Landing from './components/Landing.jsx';


function App() {
  const { themeColor } = useStore()

  return (
    <div className={`${themeColor ? 'bg-stone-700 text-white' : 'bg-lime-100 text-stone-900'} w-full h-screen`}>
      <Routes>
        <Route path="/" element={<Landing />}>
         
          <Route path="create-todo" element={<CreateTodo />} />
        </Route>
      </Routes>


    </div>
  )
}

export default App
