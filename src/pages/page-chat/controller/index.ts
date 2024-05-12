import auth from "src/api/auth";
import router from "src/core/router";

class ChatController {
  public async user() {
    try {
      await auth.user();
    } catch (error) {
      router.go("/");
      console.error("Error in: class ChatController -> user");
    }
  }
}

export default new ChatController();
