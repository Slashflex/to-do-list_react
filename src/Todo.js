import React, { Component } from "react";
import { render } from "react-dom";
import "../public/sass/main.scss";

export default class MyForm extends Component {
  constructor() {
    super();

    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit() {
    console.log("A todo was submitted : " + this.state.value);
    // alert("A todo was submitted : " + this.state.value);
  }

  render() {
    let { value } = this.state;
    
    return (

      <form onSubmit={this.handleSubmit}>
        <p>Enter your todo:</p>
        <input type="text" value={value} onChange={this.handleChange} />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

render(<MyForm />, document.getElementById("root"));
