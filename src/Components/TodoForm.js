import { Form, InputGroup, Input, Button } from "reactstrap"
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { TodoContext } from "../Context/Context";
import { ADD_TODO } from "../Reducer/action.types";
import { v4 as getKey } from "uuid";


const TodoForm = () => {

  const [todoString, setTodoString] = useState("");
  const { dispatch } = useContext(TodoContext);

  function handleAddToDo(event) {

    event.preventDefault();

    if (!todoString) {
      return toast("Please enter some text", {type: "error"});
    }

    const todo = {
      todoString,
      id: getKey()
    };

    dispatch({
      type: ADD_TODO,
      payload: todo
    });

    setTodoString("");
  }

  return (
    <Form onSubmit={handleAddToDo}>
        <InputGroup>
          <Input
            type="text"
            name="todo"
            id="todo"
            placeholder="Enter your Todo here"
            value={todoString}
            onChange={event => setTodoString(event.target.value)}
          />
          <Button
            color="warning">
            ADD
          </Button>
        </InputGroup>
    </Form>
  )
}

export default TodoForm;