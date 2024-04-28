import Block from "src/core/block";

import css from "./style.module.css";

export default class Search extends Block {
  render(): string {
    return `
      <div class="${css.search}">
        <div class="${css.goto}">
          <a class="${css.profile}">Профиль ></a>
        </div>
        <input
          class="${css.input}"
          type="text"
          placeholder="Поиск"
        />
      </div>
    `;
  }
}
