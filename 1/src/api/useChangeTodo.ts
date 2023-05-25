import { useMutation } from "react-query"
import { BASE_URL } from "."
import { ITodo } from "../interfaces"
import { useFetchTodos } from "./useFetchTodos"

export const useChangeTodo = () => {
    const { refetch } = useFetchTodos()

    return useMutation((todo: ITodo) => {
        return fetch(`${BASE_URL}/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
    }, {
        onSuccess: () => refetch()
    })
}