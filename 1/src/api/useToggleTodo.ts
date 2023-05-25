import { useMutation } from "react-query"
import { ITodo } from '../interfaces/'
import { useFetchTodos } from "./useFetchTodos"
import { BASE_URL } from "."

export const useToggleTodo = () => {
    const { refetch } = useFetchTodos()

    return useMutation((todo: ITodo) => {
        return fetch(`${BASE_URL}/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, status: !todo.status })
        })
    }, {
        onSuccess: () => refetch()
    })
}