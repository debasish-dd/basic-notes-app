import { useState } from 'react'
import { useStore, useTodoStore } from '../store/Store'
import { useNavigate } from 'react-router-dom'

export default function CreateTodo() {
  const createTodo = useTodoStore(state => state.createTodo)
  const themeColor = useStore(state => state.themeColor)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedDesc = description.trim()

    if (!trimmedTitle || !trimmedDesc) {
      setError('Title and description are required')
      return
    }

    createTodo({
      title: trimmedTitle,
      description: trimmedDesc
    })

    // reset local state
    setTitle('')
    setDescription('')
    setError(null)

    // navigate AFTER successful mutation
    navigate('/')
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex items-center justify-center flex-col m-8"
    >
      <div className="relative w-96 group m-5">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-300 focus:outline-none placeholder-transparent"
        />
        <label className="absolute left-6 top-3.5 text-sm text-gray-500 peer-focus:top-1 peer-focus:text-sm">
          Title
        </label>
      </div>

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={6}
        className="rounded-lg p-3 bg-yellow-50 text-black shadow-lg w-[32rem]"
        placeholder="Description"
      />

      {error && (
        <p className="text-red-600 mt-2 font-semibold">
          {error}
        </p>
      )}

      <button
        type="submit"
        className={`${themeColor
          ? 'bg-neutral-900 hover:bg-neutral-600 text-white'
          : 'bg-emerald-500 hover:bg-emerald-800 text-white'
        } font-semibold m-5 p-2 px-4 rounded shadow`}
      >
        Submit
      </button>
    </form>
  )
}
