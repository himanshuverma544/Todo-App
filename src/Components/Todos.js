import { useContext } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { TodoContext } from "../Context/Context";
import { REMOVE_TODO } from "../Reducer/action.types";
import { FaCheckDouble } from "react-icons/fa";


const Todos = () => {

  const {todos, dispatch} = useContext(TodoContext);

  return (
    <ListGroup className="mt-5 mb-2 items">
      {todos.map(todo => (
        <ListGroupItem key={todo.id}>
          {todo.todoString}
          <span 
            className="todo-completed-icon"
            onClick={() => {
              dispatch({
                type: REMOVE_TODO,
                payload: todo.id
              });
            }}
          >
            <FaCheckDouble/>
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Todos;