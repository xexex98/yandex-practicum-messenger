import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import {
  ChatMessage,
  Dialogs,
  DialogsHeader,
  Header,
  Messages,
  NewMessage,
} from "src/pages/page-chat/components";
import { chats } from "src/pages/page-chat/controller/chats";
import { Loader } from "src/partials";

import css from "./style.module.css";

const socket = new WebSocket(
  "wss://ya-praktikum.tech/ws/chats/586/6951/dcd8fc700a06307d7716094afd9668cb85ea6cff:1715723094"
);

socket.addEventListener("open", () => {
  console.log("Соединение установлено");
  // setInterval(() => socket.send(""), 3000);
  socket.send(
    JSON.stringify({
      content: "0",
      type: "get old",
    })
  );
});

socket.addEventListener("close", (event) => {
  if (event.wasClean) {
    console.log("Соединение закрыто чисто");
  } else {
    console.log("Обрыв соединения");
  }

  console.log(`Код: ${event.code} | Причина: ${event.reason}`);
});

socket.addEventListener("message", (event) => {
  console.log(event.data);
  if (event.data) {
    store.set("messages", JSON.parse(event.data));
  }
  // console.log("Получены данные", event.data);
});

socket.addEventListener("error", (event) => {
  console.log("Ошибка", event.message);
});

class PageMessenger extends Block {
  public init() {
    chats.getChats();
    chats.user(); //586
    // chats.
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
