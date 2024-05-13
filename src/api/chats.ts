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
  public async getChatUsers(data: { id: number }) {
    return chats.get(`/${data.id}/users`);
  }
  public async addUsersToChat(data: { users: number[]; chatId: number }) {
    return chats.put("/users", { data });
  }
  public async deleteUsersFromChat(data: { users: number[]; chatId: number }) {
    return chats.delete("/users", { data });
  }
}

export default new ChatApi();
