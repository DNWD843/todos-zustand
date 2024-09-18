import { useRef, useState } from 'react'
import { Button, Checkbox, Input, Typography } from 'antd'
import { useTodos } from './model/todoStore'
import './App.css'

function App() {
  const { todos, completeTodo, createTodo, removeTodo, updateTodo } = useTodos()

  const [title, setTitle] = useState('')
  const [selectedTodoId, setSelectedTodoId] = useState('')

  const onAdd = (selectedTodoId: string, title: string) => {
    if (!title) {
      return
    }
    if (selectedTodoId) {
      updateTodo(selectedTodoId, title)
    } else {
      createTodo({ id: Math.round(Math.random() * 10e10).toString(), title, isCompleted: false })
    }
   
    setTitle('')
    setSelectedTodoId('')
    inputRef.current?.blur()
  }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='wrapper'>
      <div className='input-wrapper'>
        <Input
          ref={inputRef}
          className='input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onAdd(selectedTodoId, title)
            }
          }}
        />
        <Button
          type='primary'
          onClick={() => onAdd(selectedTodoId, title)}
        >
          add
        </Button>
      </div>

      <ul className='card-list'>
      {todos.map(todo => (
        <li key={todo.id} className='card' onClick={(e) => {
          if ((e.target as HTMLElement).closest('.button')) {
            return
          }

          completeTodo(todo.id)
        }
        }>
          <Checkbox checked={todo.isCompleted} className='card__checkbox' />
          <Typography.Text className='card__title'>{todo.title}</Typography.Text>

          <div className='card__toolbar'>
            <Button
              className='button'
              type='link'
              danger
              onClick={() => {
                removeTodo(todo.id)
              }}
            >
              delete
            </Button>
            <Button
              className='button'
              type='link'
              onClick={() => {
                setTitle(todo.title)
                setSelectedTodoId(todo.id)
                inputRef.current?.focus()
              }}
            >
              edit
            </Button>
          </div>
          
        </li>
      ))}
      </ul>
    </div>
  )
}

export default App
