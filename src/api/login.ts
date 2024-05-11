import BaseAPI from "src/api/base-api";
import HTTP from "src/core/XMLHttpRequest";

const registerAPIInstance = new HTTP("auth");

export default class LoginAPI extends BaseAPI {
  async signin(data) {
    return registerAPIInstance.post("/signin", {
      data,
    });
  }
  async me() {
    return registerAPIInstance.get("/user");
  }
  async logout() {
    return registerAPIInstance.post("/logout");
  }
}
