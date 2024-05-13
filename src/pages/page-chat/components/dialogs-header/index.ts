import Block from "src/core/block";
import router from "src/core/router";
import SearchInput from "src/pages/page-chat/components/search-input";
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
      Input: new SearchInput(),
    });
  }

  render(): string {
    return `
      <div class="${css.search}">
        <div class="${css.goto}">
          {{{ AddChat }}}
          {{{ Profile }}}
        </div>
        {{{ Input }}}
      </div>
    `;
  }
}
