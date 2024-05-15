import auth from "src/api/auth";
import chats from "src/api/chats";
import router from "src/core/router";
import store from "src/core/store";

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
}

export default new ChatController();
