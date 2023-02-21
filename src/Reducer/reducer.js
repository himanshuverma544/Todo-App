import { LOAD_TODOS, ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "./action.types";

 export const todoReducer = (state, action) => {

  switch (action.type) {

    case LOAD_TODOS:
      return action.payload;

    case ADD_TODO:
      return [...state, action.payload];

    case UPDATE_TODO:
      return state.map(todo => (todo.id === action.payload.id ? {...todo, todoString : action.payload.todoString } : todo));

    case REMOVE_TODO:
      return state.filter(todo => (todo.id !== action.payload));

    default:
      return state;
  }
};