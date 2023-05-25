import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CgClose } from 'react-icons/cg'
import { useAddTodo } from '../api/useAddTodo'

export default function NewTodoModal(props: {
    open: boolean
    onClose: () => void
}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const { mutate: add } = useAddTodo()

    if (!props.open) return null

    return createPortal(
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000
            }} className='bg-[#1a192292]' onClick={props.onClose} />

            <form style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000
            }} className='rounded-xl p-3 bg-white flex flex-col' onSubmit={(e) => {
                e.preventDefault()
                if (!title.length) return

                const date = new Date()
                const month = date.getMonth()
                const day = date.getDate()
                const year = date.getFullYear()

                const monthsNames = [
                    'January', 'February', 'March',
                    'April', 'May', 'June',
                    'July', 'August', 'September',
                    'October', 'November', 'December'
                ]

                const time = date.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                })

                add({
                    title,
                    description,
                    status: true,
                    created: `${monthsNames[month]} ${day}, ${year}, ${time}`
                })

                props.onClose()
            }}>
                <div className="flex justify-end">
                    <button className="p-1" onClick={props.onClose}>
                        <CgClose size={25} />
                    </button>
                </div>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='mt-3 border border-gray-200 rounded-xl px-3 py-1'
                    placeholder='Title'
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='mt-1.5 border border-gray-200 rounded-xl px-3 py-1'
                    placeholder='Description'
                />

                <button
                    type='submit'
                    className='mt-3 bg-blue-700 text-white rounded-xl p-2 transition-colors hover:bg-blue-800'
                >
                    Add
                </button>
            </form>
        </>, document.getElementById('portal') as Element
    )
}