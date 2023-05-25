import { useState } from "react"
import { useFetchTodos } from "./api/useFetchTodos"
import NewTodoModal from "./components/NewTodoModal"
import Todo from "./components/Todo"

export default function App() {
  const { data: todos, isSuccess: todosIsReady } = useFetchTodos()
  const [modalToggle, setModalToggle] = useState(false)

  return <>
    <div className="w-screen md:w-[45rem] px-2 pb-2 rounded-xl">
      <div className="h-[12%] flex justify-end items-center">
        <button
          className="font-medium border border-gray-200 py-2 px-5 mt-3 rounded-xl transition-colors hover:bg-gray-200"
          onClick={() => setModalToggle(true)}
        >
          Add new todo
        </button>
      </div>

      <div className="h-[88%] mt-3">
        {todosIsReady ? (
          todos.length ? todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
            />
          )) : <h1 className="w-full text-center mt-10 text-2xl font-medium">List is empty</h1>
        ) : <h1 className="w-full text-center mt-10 text-2xl font-medium">Loading...</h1>}
      </div>
    </div>

    <NewTodoModal
      open={modalToggle}
      onClose={() => setModalToggle(false)}
    />
  </>
}