import React from "react";

const ListTodo = ({ todos, deleteTodo }) => {
  return (
    <ul>
      {todos && todos.length > 0 ? (
        todos.map((todo) => {
          return (
            <div className="todoItem">
              <li key={todo._id}>{todo.message}</li>
              <i
                class="fas fa-trash-alt"
                onClick={() => deleteTodo(todo._id)}
              ></i>
            </div>
          );
        })
      ) : (
        <li>No todo yet</li>
      )}
    </ul>
  );
};

export default ListTodo;
