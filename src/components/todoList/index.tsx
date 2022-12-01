import React, { useEffect } from 'react'
import Todo from './Todo'
import { RootState, TodoItem } from '../../types'
import { getTodosByVisibilityFilter } from '../../lib/filter/todos'
import { fetchAllTodos } from '../../slices/todosSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const todos: TodoItem[] = useSelector((state: RootState) => {
    const todos = state.todos
    const { visibilityFilter } = state
    return getTodosByVisibilityFilter(todos, visibilityFilter)
  })

  useEffect(() => {
    dispatch(fetchAllTodos())
    console.log(`*******todos ${todos}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <ul className="todo-list">
      {todos && todos.length
        ? todos.map((todo: TodoItem) => {
            return <Todo key={`todo-${todo.id}`} todo={todo} />
          })
        : 'No todos, yay!'}
    </ul>
  )
}

export default TodoList
