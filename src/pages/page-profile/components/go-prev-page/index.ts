import Block from "src/core/block";

import css from "./style.module.css";

export default class GoPrevPage extends Block {
  render(): string {
    return `
      <div class="${css.button}">
        <div class="${css.circle}">
          <span class="${css.arrow}">&#8592;</span>
        </div>
      </div>
    `;
  }
}
