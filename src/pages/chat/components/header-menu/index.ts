import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class HeaderMenu extends Block {
  render(): string {
    return `
      <ul class="${css.container}">
        <li class="${css.item}">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="5.99988"
              y1="0.5"
              x2="5.99988"
              y2="11.5"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
            <line
              x1="0.499878"
              y1="6"
              x2="11.4999"
              y2="6"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
          </svg>
          Добавить пользователя
        </li>
        <li class="${css.item}">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="5.99988"
              y1="0.5"
              x2="5.99988"
              y2="11.5"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
            <line
              x1="0.499878"
              y1="6"
              x2="11.4999"
              y2="6"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
          </svg>
          Удалить пользователя
        </li>
      </ul>
    `;
  }
}
