import { useState, useEffect, useReducer, useCallback } from 'react';

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
  const [prevListToUpdate, setPrevListToUpdate] = useState(null);

  useEffect(() => {
    loadLocalTodos();

    function loadLocalTodos() {
      const localTodos = localStorage.getItem("todos");
      if (localTodos) {
        dispatch({
          type: LOAD_TODOS,
          payload: JSON.parse(localTodos)
        });
      }
    }
  }, []);

  useEffect(() => {
    setLocalTodos();

    function setLocalTodos() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleEditTodo = useCallback((event, todoId) => {

    if (prevListToUpdate) {
      prevListToUpdate.classList.remove("selected-list-background-color");
    }

    const listToUpdate = event.target.closest(".list-item");
    listToUpdate.classList.add("selected-list-background-color");

    setTodoToEdit({...todos.find(todo => (todo.id === todoId)), status: "EDIT", listToUpdate});
    setPrevListToUpdate(listToUpdate);
  }, [todos, prevListToUpdate]);

  return (
    <TodoContext.Provider value={{todos, handleEditTodo, setPrevListToUpdate, todoToEdit, setTodoToEdit, dispatch}}>
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
