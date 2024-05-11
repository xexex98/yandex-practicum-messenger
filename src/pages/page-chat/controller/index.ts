import auth from "src/api/auth";

class ChatController {
  public async user() {
    try {
      await auth.user();
    } catch (error) {
      console.error("Error in: class ChatController -> user");
    }
  }
}

export default new ChatController();
