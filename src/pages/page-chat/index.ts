import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import {
  Dialogs,
  DialogsHeader,
  Header,
  Messages,
  NewMessage,
} from "src/pages/page-chat/components";
import { chats } from "src/pages/page-chat/controller/chats";
import { ApiError, Loader } from "src/partials";

import css from "./style.module.css";

class PageMessenger extends Block {
  public async init() {
    await chats.getChats();
    await chats.user();
  }

  constructor() {
    super({
      Loader: new Loader({ loading: true }),

      ChatsLoader: new Loader({ loading: true }),

      DialogsHeader: new DialogsHeader(),

      Dialogs: new Dialogs(),

      ChatHeader: new Header(),

      MessagesList: new Messages(),

      NewMessageInput: new NewMessage(),

      Error: new ApiError(),
    });
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    const loading = store.getState().isDialogLoading;
    const chatsLoading = store.getState().isChatsLoading;

    this.children.Loader.setProps({ loading });
    this.children.ChatsLoader.setProps({ loading: chatsLoading });
    return true;
  }

  render(): string {
    return `
      <main class="${css.messenger}">
        <div class="${css.dialogs}">
          {{{ Loader }}}
          {{{ DialogsHeader }}}
          {{{ Dialogs }}}
        </div>
        <div class="${css.chat}">
          {{#if isChatsError}}
            <div class="${css.error}">
              {{{ Error }}}
            </div>
          {{/if}}
          {{{ ChatsLoader }}}
          {{#unless isChatsError}}
            {{#if chatId}}
              {{{ ChatHeader }}}
              {{{ MessagesList }}}
              {{{ NewMessageInput }}}
            {{else}}
              <p class="${css.select}">Выберите чат</p>
            {{/if}}

          {{/unless}}
        </div>
      </main>
    `;
  }
}

export default connect(
  ({ chatId, userId, isDialogLoading, isChatsLoading, chats, messages, isChatsError }) => ({
    chatId,
    userId,
    isDialogLoading,
    isChatsLoading,
    chats,
    messages,
    isChatsError,
  })
)(PageMessenger);
