import auth from "src/api/auth";
import chats from "src/api/chats";
import router from "src/core/router";
import store from "src/core/store";

const socket = new WebSocket(
  "wss://ya-praktikum.tech/ws/chats/586/6951/dcd8fc700a06307d7716094afd9668cb85ea6cff:1715723094"
);
let first = true;

socket.addEventListener("open", () => {
  console.log("Соединение установлено");

  setInterval(
    () =>
      socket.send(
        JSON.stringify({
          type: "ping",
        })
      ),
    30000
  );
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
  // console.log(event.data);
  if (first) {
    store.set("messages", JSON.parse(event.data));
    first = false;
  }

  console.log(store.getState().messages);
  if (event.data && JSON.parse(event.data).type === "message") {
    store.set("messages", [...store.getState().messages, JSON.parse(event.data)]);
  }
});

socket.addEventListener("error", (event) => {
  console.log("Ошибка", event.message);
});

class ChatController {
  public async user() {
    try {
      const res = (await auth.user()) as XMLHttpRequest;

      store.set("user_ID", JSON.parse(res.response).id);
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
  public async getToken(id: number) {
    try {
      await chats.getToken(id);
    } catch (error) {
      console.error(error);
    }
  }

  public sendMessage(msg: string) {
    const data = JSON.stringify({
      content: msg,
      type: "message",
    });

    socket.send(data);
  }
}

export default new ChatController();
