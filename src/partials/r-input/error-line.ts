import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class ErrorLine extends Block {
  constructor(props) {
    super(props);
  }
  render(): string {
    return `
        <div class="${css.error}">{{ errorText }}</div>
      `;
  }
}
