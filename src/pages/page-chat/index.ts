import Block from "src/core/block";
import {
  ChatMessage,
  Dialog,
  Header,
  NewMessage,
  Search,
  SearchResult,
} from "src/pages/page-chat/components";

import css from "./style.module.css";

export default class PageMessenger extends Block {
  constructor() {
    super({
      Search: new Search({
        result: "Андрей",
      }),

      Dialog: new Dialog({
        name: "Андрей",
        msg: "Друзья, у меня для вас особенный выпуск новостей!.",
        unread: "12",
        date: "14:12",
      }),

      Dialog2: new Dialog({
        name: "Андрей",
        msg: "Друзья, у меня для вас особенный выпуск новостей!...",
        unread: "12",
        date: "14:12",
      }),

      Dialog3: new Dialog({
        name: "Андрей",
        msg: "Друзья, у меня для вас особенный выпуск новостей!...",
        unread: "12",
        date: "14:12",
      }),

      Result: new SearchResult({
        result: "Андрей",
      }),

      ChatHeader: new Header({}),

      Message1: new ChatMessage({
        content: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории!!",
        type: "is-in",
      }),
      Message2: new ChatMessage({
        content: "<img src='/src/assets/img/photo.png' alt='message-image' />",
        type: "is-in is-img",
      }),
      Message3: new ChatMessage({
        content: "Привет!",
        type: "is-out",
      }),
      NewMessageInput: new NewMessage(),
    });
  }

  render(): string {
    return `
      <main class="${css.messenger}">
        <ul class="${css.dialogs}">
          {{{ Search }}}
          {{{ Dialog }}}
          {{{ Dialog2 }}}
          {{{ Dialog3 }}}
          {{{ Result }}}
        </ul>
        <div class="${css.chat}">
          {{{ ChatHeader }}}
          <div class="${css.messages}">
            <div class="${css.date}">19 июня</div>
            {{{ Message1 }}}
            {{{ Message2 }}}
            {{{ Message3 }}}
          </div>
          {{{ NewMessageInput }}}
        </div>
      </main>
    `;
  }
}
