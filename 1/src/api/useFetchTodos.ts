import { useQuery } from "react-query"
import { BASE_URL } from "."
import { ITodo } from "../interfaces"

export const useFetchTodos = () => {
    return useQuery<ITodo[]>('fetchTodos', async () => {
        const response = await fetch(BASE_URL)
        return await response.json()
    }, {
        staleTime: 1000
    })
}