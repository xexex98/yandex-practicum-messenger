import Block from "../../reactivity/block";

import css from "./style.module.css";

export default class ErrorPagesLayout extends Block {
  render() {
    return `
      <div class="${css.container}">
        <h3 class="${css.code}">{{ error }}</h3>
        <p class="${css.description}">{{ description }}</p>
        <a class="${css.back}" href="#">Назад к чатам</a>
      </div>
    `;
  }
}
