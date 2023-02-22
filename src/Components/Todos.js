import { useContext, memo } from "react";
import { TodoContext } from "../Context/Context";
import { REMOVE_TODO } from "../Reducer/action.types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { FaCheckDouble, FaPen } from "react-icons/fa";
import { toast } from "react-toastify";


const Todos = () => {

  const {todos, handleEditTodo, dispatch} = useContext(TodoContext);

  return (
    <ListGroup className="mt-5 mb-2 items">
      {todos.map(todo => (
        <ListGroupItem className="list-item" key={todo.id}>
          {todo.todoString}
          <span 
            className="todo-icons"
            onClick={() => {
              dispatch({
                type: REMOVE_TODO,
                payload: todo.id
              });
              toast("Todo Removed.", {type: "success"});
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
      ))}
    </ListGroup>
  );
};

export default memo(Todos);