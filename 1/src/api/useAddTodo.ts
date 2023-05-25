import { useMutation } from "react-query"
import { BASE_URL } from "."
import { ITodo } from "../interfaces"
import { useFetchTodos } from "./useFetchTodos"

export const useAddTodo = () => {
    const { refetch } = useFetchTodos()

    return useMutation((todo: Omit<ITodo, 'id'>) => {
        return fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
    }, {
        onSuccess: () => refetch()
    })
}