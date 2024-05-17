import auth from "src/api/auth";
import chats from "src/api/chats";
import router from "src/core/router";
import store from "src/core/store";
import isIterable from "src/helpers/is-iterable";

interface WebSocketErrorEvent extends Event {
  message?: string;
}

class ChatController {
  private socket!: WebSocket;
  private prevId: number | null = null;

  public async user() {
    try {
      const res = (await auth.user()) as XMLHttpRequest;

      store.set("userID", JSON.parse(res.response).id);
    } catch (error) {
      router.go("/");
      console.error("Error in: class ChatController -> user");
    }
  }
  public async getChats() {
    try {
      store.set("isDialogLoading", true);

      const res = (await chats.getChats()) as XMLHttpRequest;

      store.set("chats", JSON.parse(res.response));
    } catch (error) {
      store.set("dialogsError", true);
      console.error(error);
    } finally {
      store.set("isDialogLoading", false);
    }
  }

  public async getChatUsers(chatId: number) {
    try {
      const res = (await chats.getChatUsers(chatId)) as XMLHttpRequest;

      store.set("chatUsers", JSON.parse(res.response));
    } catch (error) {
      console.error(error);
    }
  }
  public async createChat(title: string) {
    try {
      store.set("loading", true);

      await chats.createChat({ title });

      store.set("createChatError", false);
    } catch (error) {
      console.error(error);
      store.set("createChatError", true);
    } finally {
      store.set("loading", false);
    }
  }
  public async deleteChat(id: number) {
    try {
      store.set("isChatsLoading", true);

      await chats.deleteChat({ chatId: id });
      store.set("chatId", null);
    } catch (error) {
      console.error(error);
    } finally {
      store.set("isChatsLoading", false);
    }
  }
  public async getToken(id: number) {
    try {
      await chats.getToken(id);
    } catch (error) {
      console.error(error);
    }
  }
  public async deleteUsersFromChat(data: { users: number[]; chatId: number }) {
    try {
      store.set("loading", true);
      await chats.deleteUsersFromChat(data);
      store.set("deleteUserError", false);
    } catch (error) {
      store.set("deleteUserError", true);
      console.error(error);
    } finally {
      store.set("loading", false);
    }
  }

  public async addUsersToChat(data: { users: number[]; chatId: number }) {
    try {
      store.set("loading", true);
      await chats.addUsersToChat(data);
      store.set("addUserError", false);
    } catch (error) {
      store.set("addUserError", true);
      console.error(error);
    } finally {
      store.set("loading", false);
    }
  }

  public sendMessage(msg: string) {
    const data = JSON.stringify({
      content: msg,
      type: "message",
    });

    if (this.socket) {
      this.socket.send(data);
    }
  }

  public async changeChat() {
    store.set("isChatsLoading", true);
    if (this.socket) {
      this.socket.close();
    }
    const userID = store.getState().userID as number;
    const chatId = store.getState().chatId as number;

    if (this.prevId === chatId) {
      store.set("isChatsLoading", false);

      return;
    }
    this.prevId = chatId as number;

    const token = (await chats.getToken(chatId)) as XMLHttpRequest;

    const url = `wss://ya-praktikum.tech/ws/chats/${userID}/${chatId}/${JSON.parse(token.response).token}`;

    this.socket = new WebSocket(url);

    let timer: number;

    const handleOpen = () => {
      store.set("isChatsLoading", false);
      store.set("isChatsError", false);

      console.log("Соединение установлено");

      timer = setInterval(() => {
        this.socket.send(
          JSON.stringify({
            type: "ping",
          })
        );
      }, 5000);

      this.socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    };

    this.socket.addEventListener("open", handleOpen);

    const handleMessage = (event: MessageEvent) => {
      if (event.data && JSON.parse(event.data).type === "pong") {
        return;
      }

      let data;

      try {
        data = JSON.parse(event.data);
      } catch (error) {
        alert(`Невалидно: ${error}`);
      }

      if (Array.isArray(data)) {
        store.set("messages", data.reverse());
      }

      const messages = store.getState().messages;

      if (event.data && data.type === "message" && isIterable(messages)) {
        store.set("messages", [...messages, data]);
      }
    };

    this.socket.addEventListener("message", handleMessage);

    const handleError = (event: WebSocketErrorEvent) => {
      store.set("isChatsError", true);
      store.set("isChatsLoading", false);

      console.log("Ошибка", event.message);
    };

    this.socket.addEventListener("error", handleError);

    const handleClose = (event: CloseEvent) => {
      clearInterval(timer);
      this.socket.removeEventListener("message", handleMessage);
      this.socket.removeEventListener("open", handleOpen);
      this.socket.removeEventListener("close", handleClose);
      this.socket.removeEventListener("error", handleError);
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    };

    this.socket.addEventListener("close", handleClose);
  }
}

export default new ChatController();
