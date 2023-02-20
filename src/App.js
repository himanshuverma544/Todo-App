import { useReducer } from 'react';
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { TodoContext } from './Context/Context';
import { todoReducer } from './Reducer/reducer';

import Todos from './Components/Todos';
import TodoForm from "./Components/TodoForm";


function App() {

  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{todos , dispatch}}>
      <Container fluid>
        <h1>Todo App</h1>
        <Todos/>
        <TodoForm/>
        <ToastContainer position="bottom-center"/>
      </Container>
    </TodoContext.Provider>
  );
}

export default App;
