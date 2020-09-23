import React, { Component } from "react";
import axios from "axios";
import catchAsync from '../utils/catchAsync';

class Input extends Component {
  state = {
    message: "",
  };

  addTodo = catchAsync(async () => {
    const task = { message: this.state.message };

    if (task.message && task.message.length > 0) {
      await axios
        .post("/api/todos", task)
        .then((res) => {
          if (res.data) {
            this.props.getTodos();
            this.setState({ message: "" });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("input field required");
      return 
    }
  });

  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  render() {
    let { message } = this.state;
    return (
      <div className="todoForm">
        <input type="text" onChange={this.handleChange} value={message} />
        <button onClick={this.addTodo}>ADD</button>
      </div>
    );
  }
}

export default Input;
