import React from 'react'
// import cx from "classnames";
import { TodoItem } from '../../types'
import { patchTodo } from '../../slices/todosSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'

interface TodoProps {
  todo: TodoItem
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>()
  const handleToggleTodo = (todo: TodoItem) => {
    // useDispatchにAppDispatchを入れないとエラーになる
    dispatch(patchTodo(todo))
  }
  return (
    <li className="todo-item" onClick={() => handleToggleTodo(todo)}>
      {todo && todo.completed ? '👌' : '👋'} <span>{todo.content}</span>
    </li>
  )
}

export default Todo
