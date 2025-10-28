import React, { useState } from 'react'
import { useStore, useTodoStore } from '../store/Store'
export default function Landing() {
    const { themeColor } = useStore()
    const todos = useTodoStore((e) => e.todos)
    const updateTodo = useTodoStore((e) => e.updateTodo)

    const [todoInDetail, setTodoInDetail] = useState({})
    const [showPopUp, setShowPopUp] = useState(null)
    const fullTodo = (todo) => {
        setShowPopUp(true)
        setTodoInDetail(todo)
    }

    const editBtnHandler = () => {
        e.stopPropagation() 

    }
    const deleteBtnHandler = (id , e) => {
        e.stopPropagation() 
        const newTodo = todos.filter((todo) => todo.createdAt !== id)
        updateTodo(newTodo)
    }

    return (

        <div>
            <div className={`${themeColor ? "bg-stone-600" : 'bg-lime-300/30'} min-w-9/12 min-h-4/5 m-5 p-1 rounded shadow-lg`}>
                {todos.map((e, i) => (
                    <div
                        key={e.createdAt}
                        onClick={prev => fullTodo(e)}
                        className={`${themeColor ? "bg-stone-500" : 'bg-lime-100/30'}  m-2 p-4 rounded shadow flex justify-between items-center `}>
                        <div>
                            {i + 1}
                        </div>
                        <div>
                            {e.title}
                        </div>
                        <div className=''>
                            <button
                                onClick={p=>(editBtnHandler(p))}
                                className={`${themeColor ? "bg-stone-600 hover:bg-stone-800" : 'bg-lime-200/30 hover:bg-lime-300'} p-1 rounded shadow`} >Edit</button>
                            <button
                                onClick={prev => deleteBtnHandler(e.createdAt , prev)}
                                className={`${themeColor ? "bg-stone-600 hover:bg-stone-800" : 'bg-lime-200/30 hover:bg-lime-300'} p-1 rounded shadow mx-3`} >Delete</button>
                        </div>
                    </div>
                ))}

            </div>
            {showPopUp && (<TodoPopUp closePopUP={setShowPopUp} todo={todoInDetail} themeColor={themeColor} />)}


        </div>
    )
}

const TodoPopUp = ({ closePopUP, todo, themeColor }) => {

    const fixedTime = (time) => {
        const dateObj = new Date(time);
        return dateObj.toLocaleDateString()
    }

    return (
        <div className={`${themeColor ? "bg-stone-700" : 'bg-lime-100'}   p-1 rounded shadow-lg fixed inset-0 z-50 `}>
            <p className='font-semibold ml-10 mt-8'>created at: {fixedTime(todo.createdAt)}</p>
            <button

                className={`${themeColor ? "text-black bg-stone-500 hover:bg-stone-800 hover:text-white" : 'text-black  bg-emerald-100 hover:bg-emerald-200'}  m-5 h-10 w-12 text-center rounded-2xl shadow-lg absolute top-2 right-2 font-bold text-2xl`}
                onClick={() => closePopUP(false)} >
                x
            </button>
            <div className='flex justify-center items-center flex-col'>
                <p className={` bg-transparent border m-2 px-3 py-1 rounded font-semibold`}>Title- {todo?.title}</p>
                <p className={`bg-transparent  m-2 px-3 py-1 rounded font-semibold`}> {todo?.description}</p>
            </div>
        </div>
    )
}