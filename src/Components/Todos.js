import { useContext } from "react";
import { TodoContext } from "../Context/Context";
import { REMOVE_TODO } from "../Reducer/action.types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { FaCheckDouble, FaPen } from "react-icons/fa";


const Todos = () => {

  const {todos, handleEditTodo, dispatch} = useContext(TodoContext);

  return (
    <ListGroup className="items mt-2 mb-2 ">
      {todos.map((_, index, arr) => {
        const todo = arr.at(-index - 1);
        return (
          <ListGroupItem className="list-item" key={todo.id}>
            {todo.todoString}
            <span 
              className="todo-icons"
              onClick={() => {
                dispatch({
                  type: REMOVE_TODO,
                  payload: todo.id
                });
              }}
            >
              <FaCheckDouble/>
            </span>
            <span
              className="todo-icons px-3"
              onClick={event => {handleEditTodo(event, todo.id)}}
            >
              <FaPen/>
            </span>
          </ListGroupItem>
        )
      })}
    </ListGroup>
  );
};

export default Todos;