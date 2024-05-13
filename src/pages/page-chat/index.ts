import Block from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import {
  ChatMessage,
  Dialog,
  DialogList,
  Header,
  NewMessage,
  Search,
  SearchResult,
} from "src/pages/page-chat/components";
import controller from "src/pages/page-chat/controller";
import { chats } from "src/pages/page-chat/controller/chats";

import css from "./style.module.css";

class PageMessenger extends Block {
  public init() {
    controller.user();
    // chats.createChat("test");
    chats.getChats();
  }

  constructor() {
    super({
      Search: new Search(),

      DialogList: new DialogList(),

      // Result: new SearchResult({
      //   result: "Андрей",
      // }),

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
        <div class="${css.dialogs}">
          {{{ Search }}}
          {{{ DialogList }}}
          {{{ Result }}}
        </div>
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

export default connect(({ chatId, chats }) => ({ chatId, chats }))(PageMessenger);
