import { useEffect, useState } from 'react'
import { TodoProvider } from "./contexts/index"
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (title) => {
    setTodos((prev) => [{ id: Date.now(), ...title }, ...prev])
  }
  const updateTodo = (id, title) => {
    setTodos((prev) => prev.map((prevTodos) => prevTodos.id === id ? title : prevTodos))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todos) => todos.id !== id))
  }
  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((prevTodos) => prevTodos.id == id ? { ...prevTodos, completed: !prevTodos.completed } : prevTodos))
  }
  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        if (!Array.isArray(parsedTodos)) {
          throw new Error('Invalid todos format');
        }
        setTodos(parsedTodos);
      }
    } catch (error) {
      console.error('Error parsing todos:', error);
      // Clear local storage if there's an error
      localStorage.removeItem('todos');
    }
  }, []);
  
  -
  useEffect(() => {
    console.log('Updating localStorage with todos:', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Your ToDoList</h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
