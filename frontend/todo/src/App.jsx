
import { Routes, Route, Outlet } from "react-router-dom";
import { useStore } from './store/Store.js'
import CreateTodo from './components/CreateTodo.jsx';
import Todo from './components/Todo.jsx'
import Layout from './Layout.jsx';
import Home from './components/Home.jsx'

function App() {
  const themeColor = useStore(state => state.themeColor);

  return (
    <div className={`${themeColor ? 'bg-stone-700 text-white' : 'bg-lime-100 text-stone-900'} w-full h-screen`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='' element={<Home/>} />
          <Route path="todo" element={Todo} />
          <Route path="create-todo" element={<CreateTodo />} />
        </Route>
      </Routes>


    </div>
  )
}

export default App
