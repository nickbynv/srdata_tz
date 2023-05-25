import { useMutation } from "react-query"
import { BASE_URL } from "."
import { IContact } from "../interfaces"
import { useFetchContacts } from "./useFetchContacts"

export const useAddContact = () => {
    const { refetch } = useFetchContacts()

    return useMutation((contact: Omit<IContact, 'id'>) => {
        return fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        })
    }, {
        onSuccess: () => refetch()
    })
}