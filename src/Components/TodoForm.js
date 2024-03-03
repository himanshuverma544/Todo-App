import { Form, InputGroup, Input, Button } from "reactstrap";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { TodoContext } from "../Context/Context";
import { ADD_TODO, UPDATE_TODO } from "../Reducer/action.types";
import { v4 as getKey } from "uuid";


const TodoForm = () => {

  const [todoString, setTodoString] = useState("");
  const { setPrevListToUpdate, todoToEdit, setTodoToEdit, dispatch } = useContext(TodoContext);
  const todoInputField = useRef(null);

  useEffect(() => {
    
    if (todoToEdit.status === "EDIT") {
      setTodoString(todoToEdit.todoString);

      if (todoInputField.current) {
        todoInputField.current.focus();
      }
    }
  }, [todoToEdit.status, todoToEdit.todoString]);

  const handleSubmit = useCallback((event) => {

    event.preventDefault();

    if (!todoString) {
      return;
    }

    const todo = {
      todoString,
      id: todoToEdit.status !== "EDIT" ? getKey() : todoToEdit.id
    };

    switch (todoToEdit.status) {
      
      case "EDIT" :

        dispatch({
          type: UPDATE_TODO,
          payload: todo
        });

        setTodoToEdit(prev => ({
          ...prev,
           status: null
        }));

        setPrevListToUpdate(null);

        todoToEdit.listToUpdate.classList.remove("selected-list-background-color");
        break;

      default:
        dispatch({
          type: ADD_TODO,
          payload: todo
        });
    }
    
    setTodoString("");
  }, [todoString, setPrevListToUpdate, todoToEdit, setTodoToEdit, dispatch]);

  return (
    <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            id="todo"
            name="todo"
            type="text"
            innerRef={todoInputField}
            placeholder="Enter your Todo here"
            value={todoString}
            onChange={event => setTodoString(event.target.value)}
            autoFocus
            autoComplete="off"
          />
          <Button
            color="warning">
            {todoToEdit.status !== "EDIT" ? "ADD" : "UPDATE"}
          </Button>
        </InputGroup>
    </Form>
  )
}

export default TodoForm;