import { useState } from "react"
import { useFetchContacts } from "./api/useFetchContacts"
import Contact from "./components/Contact"
import NewTodoModal from "./components/NewContactModal"
import { IContact } from "./interfaces"

export default function App() {
  const { data: contacts } = useFetchContacts()

  const [search, setSearch] = useState<Omit<IContact, 'id'>>({
    title: "",
    phone: "",
    description: "",
    created: ""
  })

  const searchKeys = Object.keys(search) as (keyof typeof search)[]

  const [modalToggle, setModalToggle] = useState(false)

  return <>
    <div className="fixed top-2 right-2">
      <button
        className="bg-blue-600 shadow-md text-white rounded-xl px-3 py-2 w-full text-lg font-medium transition-colors hover:bg-blue-800"
        onClick={() => setModalToggle(true)}
      >
        Add new contact
      </button>

      <div className="flex flex-col p-5 bg-white border border-gray-200 rounded-xl mt-2 shadow-md">
        {searchKeys.map(field => (
          <input
            value={search[field as keyof typeof search]}
            onChange={(e) => setSearch(prev => ({ ...prev, [field]: e.target.value }))}
            className="border border-gray-200 rounded-xl px-3 py-1 mt-2 first:mt-0"
            placeholder={`Search by ${field}`}
          />
        ))}
      </div>
    </div>

    <div className="md:w-[45rem] p-2">
      {contacts?.filter(contact => (
        searchKeys.every(field => (
          contact[field].toLowerCase().includes(search[field].toLowerCase())
        ))
      )).map(contact => <Contact key={contact.id} contact={contact} />)}
    </div>

    <NewTodoModal
      open={modalToggle}
      onClose={() => setModalToggle(false)}
    />
  </>
}