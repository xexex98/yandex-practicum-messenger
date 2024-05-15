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
import { Loader } from "src/partials";

import css from "./style.module.css";

class PageMessenger extends Block {
  public init() {
    chats.getChats();
    chats.user(); //586
    // chats.getToken(6951);
  }

  constructor() {
    super({
      Loader: new Loader({ loading: true }),

      DialogsHeader: new DialogsHeader(),

      Dialogs: new Dialogs(),

      ChatHeader: new Header(),

      MessagesList: new Messages(),

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
          {{{ MessagesList }}}
          {{{ NewMessageInput }}}
        </div>
      </main>
    `;
  }
}

export default connect(({ chatId, userId, isDialogLoading, chats, messages }) => ({
  chatId,
  userId,
  isDialogLoading,
  chats,
  messages,
}))(PageMessenger);
