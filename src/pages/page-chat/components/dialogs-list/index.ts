import Block from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";

import css from "./style.module.css";

class DialogsList extends Block {
  constructor() {
    super({
      events: {
        click: (e) => {
          if (e.target) {
            const chatId = Number((e.target as HTMLElement).closest("li")?.getAttribute("data-id"));

            store.set("chatId", chatId);
          }
        },
      },
    });
  }

  public render(): string {
    return `
      <ul class="${css.dialogs}">
        {{#each chats}}
          <li data-id="{{ id }}">
            <div class="${css.dialog}">
              <div class="${css.border}"></div>
              <div class="${css.avatar}"></div>
              <div class="${css.content}">
                <p class="${css.user}">{{ title }}</p>
                <p class="${css.message}">{{ last_message }}</p>
              </div>
              <div class="${css.info}">
                <p class="${css.time}">{{ date }}</p>
                {{#if unread_count}}
                  <p class="${css.unread}">{{ unread_count }}</p>
                {{/if}}
              </div>
            </div>
          </li>
        {{/each}}
      </ul>
    `;
  }
}

export default connect(({ chats }) => ({ chats }))(DialogsList);
