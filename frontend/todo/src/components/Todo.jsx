import React, { useState } from 'react'
import { useStore, useTodoStore } from '../store/Store'

export default function TodoList() {
  const themeColor = useStore((s) => s.themeColor)
  const todos = useTodoStore((s) => s.todos)
  const updateTodo = useTodoStore((s) => s.updateTodo)
  const deleteTodo = useTodoStore((s) => s.deleteTodo)

  const [todoInDetail, setTodoInDetail] = useState(null)
  const [showPopUp, setShowPopUp] = useState(false)
  const [popupMode, setPopupMode] = useState('view')

  // edit form state
  const [editTitle, setEditTitle] = useState('')
  const [editDesc, setEditDesc] = useState('')

  const openView = (todo) => {
    setTodoInDetail(todo)
    setPopupMode('view')
    setShowPopUp(true)
  }

  const openEdit = (todo, e) => {
    e.stopPropagation()
    setTodoInDetail(todo)
    setEditTitle(todo.title || '')
    setEditDesc(todo.description || '')
    setPopupMode('edit')
    setShowPopUp(true)
  }

  const deleteBtnHandler = (id, e) => {
    e.stopPropagation()
    const ok = window.confirm('Delete this todo? This cannot be undone.')
    if (!ok) return
    deleteTodo(id)

    if (todoInDetail && todoInDetail.id === id) {
      setShowPopUp(false)
      setTodoInDetail(null)
    }
  }

  const saveEdit = () => {
    if (!todoInDetail) return
    if (!editTitle.trim()) {
      alert('Title cannot be empty')
      return
    }
    updateTodo(todoInDetail.id, {
      title: editTitle.trim(),
      description: editDesc.trim()
    })
    setShowPopUp(false)
    setTodoInDetail(null)
  }

  const closePopup = () => {
    setShowPopUp(false)
    setTodoInDetail(null)
  }

  return (
    <div className="w-full flex justify-center p-4">
      <div
        className={`${
          themeColor ? 'bg-stone-700' : 'bg-lime-50'
        } w-full max-w-4xl min-h-[60vh] p-6 rounded-2xl shadow-lg`}
      >
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className={`text-6xl mb-4 ${themeColor ? 'opacity-30' : 'opacity-20'}`}>
              📝
            </div>
            <p className={`text-lg ${themeColor ? 'text-stone-300' : 'text-stone-600'}`}>
              No todos yet — add one to get started!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {todos.map((todo, i) => (
              <div
                key={todo.id}
                onClick={() => openView(todo)}
                className={`${
                  themeColor
                    ? 'bg-stone-600 hover:bg-stone-500'
                    : 'bg-white hover:bg-lime-100'
                } p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 cursor-pointer transition-all hover:shadow-lg`}
                aria-label={`Todo ${i + 1}: ${todo.title}`}
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div
                    className={`font-mono text-sm w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ${
                      themeColor ? 'bg-stone-700' : 'bg-lime-200'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`font-semibold mb-1 ${themeColor ? 'text-white' : 'text-stone-900'}`}>
                      {todo.title}
                    </div>
                    {todo.description && (
                      <div
                        className={`text-sm line-clamp-2 ${
                          themeColor ? 'text-stone-300' : 'text-stone-600'
                        }`}
                      >
                        {todo.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:flex-shrink-0">
                  <button
                    onClick={(e) => openEdit(todo, e)}
                    className={`${
                      themeColor
                        ? 'bg-stone-700 hover:bg-stone-800 text-white'
                        : 'bg-lime-200 hover:bg-lime-300 text-stone-900'
                    } px-4 py-2 rounded-lg shadow transition-colors font-medium text-sm`}
                    aria-label={`Edit todo ${i + 1}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => deleteBtnHandler(todo.id, e)}
                    className={`${
                      themeColor
                        ? 'bg-red-900 hover:bg-red-800 text-white'
                        : 'bg-red-100 hover:bg-red-200 text-red-900'
                    } px-4 py-2 rounded-lg shadow transition-colors font-medium text-sm`}
                    aria-label={`Delete todo ${i + 1}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showPopUp && (
        <TodoPopUp
          closePopup={closePopup}
          todo={todoInDetail}
          themeColor={themeColor}
          mode={popupMode}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editDesc={editDesc}
          setEditDesc={setEditDesc}
          onSave={saveEdit}
        />
      )}
    </div>
  )
}

const TodoPopUp = ({
  closePopup,
  todo,
  themeColor,
  mode,
  editTitle,
  setEditTitle,
  editDesc,
  setEditDesc,
  onSave,
}) => {
  if (!todo) return null

  const fixedTime = (time) => {
    const dateObj = new Date(time)
    return dateObj.toLocaleString()
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className={`${
          themeColor ? 'bg-stone-800 text-white' : 'bg-white text-stone-900'
        } w-full max-w-2xl rounded-2xl shadow-2xl relative p-6 max-h-[90vh] overflow-y-auto`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-2xl transition-colors ${
            themeColor
              ? 'bg-stone-700 hover:bg-stone-600 text-white'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
          }`}
          onClick={closePopup}
          aria-label="Close popup"
        >
          ×
        </button>

        <div
          className={`mb-6 text-xs ${
            themeColor ? 'text-stone-400' : 'text-stone-500'
          }`}
        >
          Created: {fixedTime(todo.createdAt)}
        </div>

        {mode === 'view' ? (
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold pr-8">{todo.title}</h3>
            {todo.description ? (
              <p className="whitespace-pre-wrap leading-relaxed">{todo.description}</p>
            ) : (
              <p className={`italic ${themeColor ? 'text-stone-400' : 'text-stone-500'}`}>
                No description
              </p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  themeColor
                    ? 'bg-stone-700 hover:bg-stone-600 text-white'
                    : 'bg-lime-200 hover:bg-lime-300 text-stone-900'
                }`}
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label
                className={`block font-semibold mb-2 ${
                  themeColor ? 'text-white' : 'text-stone-900'
                }`}
              >
                Title *
              </label>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={`w-full p-3 rounded-lg border-2 transition-colors ${
                  themeColor
                    ? 'bg-stone-700 border-stone-600 text-white placeholder-stone-400 focus:border-stone-500'
                    : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400 focus:border-lime-400'
                } outline-none`}
                placeholder="Enter todo title"
                autoFocus
              />
            </div>

            <div>
              <label
                className={`block font-semibold mb-2 ${
                  themeColor ? 'text-white' : 'text-stone-900'
                }`}
              >
                Description
              </label>
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={6}
                className={`w-full p-3 rounded-lg border-2 transition-colors resize-none ${
                  themeColor
                    ? 'bg-stone-700 border-stone-600 text-white placeholder-stone-400 focus:border-stone-500'
                    : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400 focus:border-lime-400'
                } outline-none`}
                placeholder="Enter todo description (optional)"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={onSave}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  themeColor
                    ? 'bg-lime-700 hover:bg-lime-600 text-white'
                    : 'bg-lime-500 hover:bg-lime-600 text-white'
                }`}
              >
                Save Changes
              </button>
              <button
                onClick={closePopup}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  themeColor
                    ? 'bg-stone-700 hover:bg-stone-600 text-white'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-900'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}