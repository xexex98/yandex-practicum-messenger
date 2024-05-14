import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import {
  ChatMessage,
  Dialogs,
  DialogsHeader,
  Header,
  NewMessage,
} from "src/pages/page-chat/components";
import { chats } from "src/pages/page-chat/controller/chats";
import { Loader } from "src/partials";

import css from "./style.module.css";

class PageMessenger extends Block {
  public init() {
    // controller.user();
    // chats.createChat("zzzddd");
    chats.getChats();
  }

  constructor() {
    super({
      Loader: new Loader({ loading: true }),

      DialogsHeader: new DialogsHeader(),
      Dialogs: new Dialogs(),
      ChatHeader: new Header(),

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

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    const loading = store.getState().isDialogLoading;

    this.children.Loader.setProps({ loading });
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

export default connect(({ chatId, isDialogLoading, chats }) => ({
  chatId,
  isDialogLoading,
  chats,
}))(PageMessenger);
