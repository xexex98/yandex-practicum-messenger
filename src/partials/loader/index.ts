import Block from "src/core/block";

import css from "./style.module.css";

class Loader extends Block {
  public render(): string {
    return `
      <div class="${css.container} {{#if loading}}${css.show}{{/if}}">
        <div class="${css.loader}"></div>
      </div>
    `;
  }
}

export default Loader;
