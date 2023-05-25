import { useMutation } from "react-query"
import { BASE_URL } from "."
import { useFetchTodos } from "./useFetchTodos"

export const useRemoveTodo = () => {
    const { refetch } = useFetchTodos()

    return useMutation((id: string) => {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        })
    }, {
        onSuccess: () => refetch()
    })
}