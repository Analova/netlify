import React, { Component } from "react";
import "./app.scss";
export default class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <header>
        <div className="logo">Argos Real Estate </div>
        <nav>
          <a href="#">About us </a>
          <a href="#" className="register-btn">
            Contact us
          </a>
        </nav>
      </header>
    );
  }
}
