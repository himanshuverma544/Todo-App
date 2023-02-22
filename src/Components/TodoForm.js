import { Form, InputGroup, Input, Button } from "reactstrap";
import { toast } from "react-toastify";
import { useState, useEffect, useContext, useRef, useCallback, memo } from "react";
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
  }, [todoToEdit]);


  const handleSubmit = useCallback((event) => {

    event.preventDefault();

    if (!todoString) {
      return toast("Please enter some text.", {type: "error"});
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
        toast("Todo Updated.", {type: "success"})
        break;

      default:
        dispatch({
          type: ADD_TODO,
          payload: todo
        });
        toast("Todo Added.", {type: "success"})
    }
    
    setTodoString("");
  }, [todoString, setPrevListToUpdate, todoToEdit, setTodoToEdit, dispatch]);

  return (
    <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            innerRef={todoInputField}
            name="todo"
            id="todo"
            placeholder="Enter your Todo here"
            value={todoString}
            onChange={event => setTodoString(event.target.value)}
            autoFocus
          />
          <Button
            color="warning">
            {todoToEdit.status !== "EDIT" ? "ADD" : "UPDATE"}
          </Button>
        </InputGroup>
    </Form>
  )
}

export default memo(TodoForm);