import { useState } from "react"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { ImCheckmark } from "react-icons/im"
import { useChangeTodo } from "../api/useChangeTodo"
import { useRemoveTodo } from "../api/useRemoveTodo"
import { useToggleTodo } from "../api/useToggleTodo"
import { ITodo } from "../interfaces"

export default function Todo(props: {
    todo: ITodo
}) {
    const [editMode, setEditMode] = useState(false)

    const [title, setTitle] = useState(props.todo.title)
    const [description, setDescription] = useState(props.todo.description)

    const stylesLogic = `
        ${editMode && '!bg-white !px-4 !py-1 !border !border-gray-200 !cursor-text'}
        ${!props.todo.status && !editMode && '!line-through'}
    `

    const { mutate: toggle } = useToggleTodo()
    const { mutate: change } = useChangeTodo()
    const { mutate: remove } = useRemoveTodo()

    return (
        <div
            className="flex flex-col bg-gray-100 border border-gray-200 p-5 px-6 rounded-xl mt-2 first:mt-0 transition-colors cursor-pointer hover:bg-gray-200"
            onClick={() => {
                if (editMode) return
                toggle(props.todo)
            }}
        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={"font-medium text-xl bg-transparent rounded-xl cursor-pointer" + stylesLogic}
                readOnly={!editMode}
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={"mt-2 resize-none bg-transparent rounded-xl h-20 cursor-pointer" + stylesLogic}
                readOnly={!editMode}
            />

            <div className="flex justify-between items-center font-medium mt-2">
                <div className="flex flex-col text-[#1e366b]">
                    <span>Created: {props.todo.created}</span>
                    <span>Status: {props.todo.status ? (
                        <span className="text-orange-500">non completed</span>
                    ) : (
                        <span className="text-green-600">completed</span>
                    )}</span>
                </div>

                <div className="flex items-center ml-3">
                    {editMode ? (
                        <button onClick={(e) => {
                            e.stopPropagation()
                            if (!title.length) return
                            change({ ...props.todo, title, description })
                            setEditMode(false)
                        }}>
                            <ImCheckmark size={25} className="text-green-700 mb-[1px]" />
                        </button>
                    ) : (
                        <button onClick={(e) => {
                            e.stopPropagation()
                            setEditMode(true)
                        }}>
                            <FaEdit size={25} className="text-blue-900 mb-[1px]" />
                        </button>
                    )}

                    <button onClick={() => {
                        remove(props.todo.id)
                    }}>
                        <FaTrashAlt size={22} className="text-red-800 ml-3" />
                    </button>
                </div>
            </div>
        </div>
    )
}