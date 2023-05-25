import { useQuery } from "react-query"
import { BASE_URL } from "."
import { IContact } from "../interfaces"

export const useFetchContacts = () => {
    return useQuery<IContact[]>('fetchContacts', async () => {
        const response = await fetch(BASE_URL)
        return await response.json()
    }, {
        staleTime: 1000
    })
}