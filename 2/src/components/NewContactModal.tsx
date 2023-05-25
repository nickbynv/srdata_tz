import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useAddContact } from '../api/useAddContact'

export default function NewTodoModal(props: {
    open: boolean
    onClose: () => void
}) {
    const [title, setTitle] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')

    const { mutate: add } = useAddContact()

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
                if (!(title.length && phone.length)) return

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

                const formatPhoneNumber = (phoneNumber: string) => {
                    const countryCode = phoneNumber.slice(0, 1);
                    const areaCode = phoneNumber.slice(1, 4);
                    const remainingDigits = phoneNumber.slice(4);

                    const formattedPhoneNumber = `+${countryCode} ${areaCode} ${remainingDigits.match(/.{1,2}/g)?.join('-')}`;

                    return formattedPhoneNumber;
                }

                add({
                    title,
                    phone: formatPhoneNumber(phone),
                    description,
                    created: `${monthsNames[month]} ${day}, ${year}, ${time}`
                })

                props.onClose()
            }}>
                <div className="flex justify-end">
                    <button className="p-1" onClick={props.onClose}>
                        X
                    </button>
                </div>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='mt-3 border border-gray-200 rounded-xl px-3 py-1'
                    placeholder='Name'
                />

                <input
                    value={phone}
                    onChange={(e) => {
                        if (Number.isNaN(Number(e.target.value))) return
                        setPhone(e.target.value)
                    }}
                    className='mt-1.5 border border-gray-200 rounded-xl px-3 py-1'
                    placeholder='Phone'
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