import Block from "src/core/block";
import router from "src/core/router";
import { ButtonLink } from "src/partials";

import css from "./style.module.css";

export default class DialogsHeader extends Block {
  constructor() {
    super({
      AddChat: new ButtonLink({
        text: "Создать чат +",
        type: "button",
        events: { click: () => null },
      }),
      Profile: new ButtonLink({
        text: "Профиль >",
        type: "button",
        events: { click: () => router.go("/settings") },
      }),
    });
  }
  render(): string {
    return `
      <div class="${css.search}">
        <div class="${css.goto}">
          {{{ AddChat }}}
          {{{ Profile }}}
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
