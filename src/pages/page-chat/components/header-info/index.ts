import Block from "src/core/block";

import css from "./style.module.css";

export default class HeaderInfo extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <div class="${css.avatar}">
        <div class="${css.login}"></div>
        <p>{{ name }}</p>
      </div>
    `;
  }
}
