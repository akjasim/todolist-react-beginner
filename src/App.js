import React, {useState} from 'react';
import './App.css';
import Todo from "./components/Todo";

function App() {

  const [todos, setTodos] = useState(
    [
      {
        title: 'Hello World',
        completed: false,
        isUpdating: false
      },
      {
        title: 'React is awesome!',
        completed: false,
        isUpdating: false
      },
      {
        title: 'Django with React is super-awesome!',
        completed: false,
        isUpdating: false
      }
    ]
  )

  const createTodoHandler = (e) => {
    e.preventDefault()
    const title = document.getElementById('item').value;
    const submitBtn = document.getElementById('submitBtn')
    e.target.reset()

    // Checking if todo already exists.
    const todoItem = todos.find(todo => todo.title.toLowerCase() === title.toLowerCase())
    if (todoItem) {
      alert('Todo already exists')
      return
    }
    if (submitBtn.innerText === 'Update') {
      const updateTodoIndex = todos.findIndex(todo => todo.isUpdating === true)
      const tempTodos = [...todos]
      const updatedTodoItem = tempTodos[updateTodoIndex]
      updatedTodoItem.title = title
      updatedTodoItem.isUpdating = false
      submitBtn.innerText = "Submit"
      setTodos(tempTodos)
    } else {
        if (title) {
          setTodos((oldState, props) => {
            return [
              ...oldState,
              {
                title: title,
                completed: false,
                isUpdating: false
              }
            ]
          })
        }
      }
   }

  const updateTodoHandler = (index) => {
    const tempTodos = todos.map(todo => {
      todo.isUpdating = false
      return todo
    })
    const todoItem = tempTodos[index]
    todoItem.isUpdating = true

    const inputField = document.getElementById('item')
    inputField.value = todoItem.title
    const submitBtn = document.getElementById('submitBtn')
    submitBtn.innerText = "Update"

    setTodos(tempTodos)
  }

  const deleteTodoHandler = (index) => {
    const tempTodos = [...todos]
    tempTodos.splice(index, 1)
    setTodos(tempTodos)
  }

  const strikeTodoHandler = (index) => {
    setTodos(todos.map((todo, todoIndex) => {
      if (index === todoIndex)
        todo.completed = !todo.completed
      return todo
    }))
  }

  return (
    <div className="main">
      <h1 style={styles}>Todo App</h1>
      <form onSubmit={(event) => createTodoHandler(event)}>
        <label htmlFor="item" style={{display: 'block', marginBottom: '10px'}}>Title*</label>
        <input type="text" id="item" required placeholder="Add a new Todo..."/>
        <button className="btn" id="submitBtn" type="submit">Submit</button>
      </form>
      <div className="todos">
        {todos.map((todo, index) => (
          <Todo
            key={todo.title}
            title={todo.title}
            completed={todo.completed}
            update={updateTodoHandler.bind(this, index)}
            delete={() => deleteTodoHandler(index)}
            strike={() => strikeTodoHandler(index)}
          />
          )
        )}
      </div>
    </div>
  );
}

const styles = {
  textAlign: 'center',
  fontSize: '55px',
  fontFamily: 'monospace'
}

export default App;
