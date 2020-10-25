import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] =useState([]);
  const [status, setStatus] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Filter Functions 
  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  //run once when the app runs 
  useEffect(() => {
    getLocalTodos()
  }, [])

  //Run when todos and status change
  useEffect(() => {
    filterHandler();
    saveLocalTodos()
  }, [todos, status])

  // Save to local 
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let todosLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todosLocal)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Chloe's Todo List</h1>
      </header>
      <Form 
        setInputText={setInputText} 
        todos={todos} 
        setTodos={setTodos} 
        inputText={inputText}
        setStatus={setStatus}
        filteredTodos={filteredTodos}
      />
      <TodoList 
        setTodos={setTodos} 
        todos={todos}
        filteredTodos={filteredTodos}
        />
    </div>
  );
}

export default App;
