import Block from "src/core/block";
import connect from "src/core/connect";

import css from "./style.module.css";

class FormError extends Block {
  public render(): string {
    return `
      <div>
        {{#if error}}
          <p class="${css.error}">Что-то пошло не так, повторите попытку</p>
        {{/if}}
      </div>
    `;
  }
}

export default connect(({ error }) => ({ error }))(FormError);
