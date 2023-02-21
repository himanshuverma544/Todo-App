import { useState, useReducer, useEffect } from 'react';
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { TodoContext } from './Context/Context';
import { todoReducer } from './Reducer/reducer';
import { LOAD_TODOS } from './Reducer/action.types';

import Todos from './Components/Todos';
import TodoForm from "./Components/TodoForm";


const App = () => {

  const [todos, dispatch] = useReducer(todoReducer, []);
  const [todoToEdit, setTodoToEdit] = useState({});
  const [previousListToUpdate, setPreviousListToUpdate] = useState();

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      console.log("Runs 1:", localTodos);
      dispatch({
        type: LOAD_TODOS,
        payload: JSON.parse(localTodos)
      });
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos])

  function handleEditTodo(event, todoId) {

    if (previousListToUpdate) {
      previousListToUpdate.classList.remove("selected-list-background-color");
    }

    const listToUpdate = event.target.closest(".list-item");
    listToUpdate.classList.add("selected-list-background-color");

    setPreviousListToUpdate(listToUpdate);
    setTodoToEdit({...todos.find(todo => (todo.id === todoId)), status: "EDIT", listToUpdate});
  }

  return (
    <TodoContext.Provider value={{todos, handleEditTodo, todoToEdit, setTodoToEdit, dispatch}}>
      <Container fluid>
        <h1>Todo App</h1>
        <Todos/>
        <TodoForm/>
        <ToastContainer position="top-left"/>
      </Container>
    </TodoContext.Provider>
  );
}

export default App;
