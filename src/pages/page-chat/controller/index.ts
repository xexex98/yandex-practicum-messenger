import auth from "src/api/auth";
import chats from "src/api/chats";
import router from "src/core/router";
import store from "src/core/store";

class ChatController {
  public async user() {
    try {
      await auth.user();
    } catch (error) {
      router.go("/");
      console.error("Error in: class ChatController -> user");
    }
  }
  public async getChats() {
    try {
      store.set("isDialogLoading", true);
      const res = (await chats.getChats()) as XMLHttpRequest;

      // await chats.deleteChat({
      //   chatId: 6787,
      // });

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
}

export default new ChatController();
