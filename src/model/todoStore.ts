import { create } from "zustand"
import { devtools } from 'zustand/middleware'

export interface TodoType {
    id: string
    title: string
    isCompleted: boolean
}

export type TodoState = {
    todos: TodoType[]
}

export interface TodoAction {
    createTodo: (todo: TodoType) => void
    completeTodo: (id: string) => void
    removeTodo: (id: string) => void
    updateTodo: (id: string, newTitle: string) => void
}

type TodoStoreType = TodoState & TodoAction

export const useTodos = create<TodoStoreType>()(
    devtools((set) => ({
        todos: [{id: '1', title: 'test todo', isCompleted: false}],
        createTodo: (todo) => set(state => ({ todos: [todo, ...state.todos] }), false, `CREATE_TODO_${todo.id}`),
        completeTodo: (id) => set(state => ({
            todos: state.todos.map(todo => {
                if (todo.id === id) {                
                    return { ...todo, isCompleted: !todo.isCompleted }
                }
                
                return todo
            })
        }), false, `COMPLETE_TODO_${id}`),
        removeTodo: (id: string) => set(state => ({ todos: state.todos.filter(todo => todo.id !== id) }), false, `REMOVE_TODO_${id}`),
        updateTodo: (id: string, newTitle: string) => set(state => ({
            todos: state.todos.map(todo => {
                if (todo.id === id) {                
                    return {...todo, title: newTitle}
                }
                return todo
        })}), false, `UPDATE_TODO_${id}`)
    }))
)