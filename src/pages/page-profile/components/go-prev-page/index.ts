import Block from "src/core/block";
import router from "src/core/router";

import css from "./style.module.css";

export default class GoPrevPage extends Block {
  constructor() {
    super({ events: { click: () => router.back() } });
  }
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
