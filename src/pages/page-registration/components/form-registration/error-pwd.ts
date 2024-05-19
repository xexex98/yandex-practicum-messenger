import Block from "src/core/block";
import connect from "src/core/connect";

import css from "./style.module.css";

class PasswordError extends Block {
  public render(): string {
    return `
      <div>
        {{#if pwdError}}
          <p class="${css.error}">Пароли должны совпадать</p>
        {{/if}}
      </div>
    `;
  }
}

export default connect(({ pwdError }) => ({ pwdError }))(PasswordError);
