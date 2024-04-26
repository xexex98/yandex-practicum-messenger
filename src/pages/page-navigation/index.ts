import Block from "src/core/block";

import css from "./style.module.css";

export default class PageNavigation extends Block {
  render() {
    return `
      <nav id="nav">
        <ul class="${css.navigation}">
          <li>
            <a
              href="#"
              page="login"
              >Login</a
            >
          </li>
          <li>
            <a
              href="#"
              page="registration"
              >Registration</a
            >
          </li>
          <li>
            <a
              href="#"
              page="profile"
              >Profile</a
            >
          </li>
          <li>
            <a
              href="#"
              page="404"
              >404</a
            >
          </li>
          <li>
            <a
              href="#"
              page="500"
              >500</a
            >
          </li>
          <li>
            <a
              href="#"
              page="chat"
              >Chat</a
            >
          </li>
        </ul>
    </nav>
  `;
  }
}
