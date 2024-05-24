import Block from "src/core/block";

import css from "./style.module.css";

class ApiError extends Block {
  public render(): string {
    return `
      <div>
        <p class="${css.error}">Что-то пошло не так, повторите попытку</p>
      </div>
    `;
  }
}

export default ApiError;
