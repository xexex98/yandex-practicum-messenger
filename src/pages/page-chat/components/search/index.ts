import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class Search extends Block {
  constructor(props) {
    super(props);
  }

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
