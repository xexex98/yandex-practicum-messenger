import Block from "src/core/block";
import connect from "src/core/connect";

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

const isLoading = connect((state) => ({
  loading: state.loading,
}));

export default isLoading(Loader);
