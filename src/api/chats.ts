import HTTP from "src/core/XMLHttpRequest";

const chats = new HTTP("chats");

class ChatApi {
  public async getChats() {
    return chats.get("/");
  }
  public async createChat(data: { title: string }) {
    return chats.post("/", { data });
  }
  public async deleteChat(data: { chatId: number }) {
    return chats.delete("/", { data });
  }
  public async getChatUsers(id: number) {
    return chats.get(`/${id}/users`);
  }
  public async addUsersToChat(data: { users: number[]; chatId: number }) {
    return chats.put("/users", { data });
  }
  public async deleteUsersFromChat(data: { users: number[]; chatId: number }) {
    return chats.delete("/users", { data });
  }
  public async getToken(id: number) {
    return chats.post(`/token/${id}`);
  }
}

export default new ChatApi();
