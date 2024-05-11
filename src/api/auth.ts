import BaseAPI from "src/api/base-api";
import HTTP from "src/core/XMLHttpRequest";

const registerAPIInstance = new HTTP("auth");

type TData = Record<string, unknown>;

class AuthApi extends BaseAPI {
  async signup(data: TData) {
    return registerAPIInstance.post("/signup", {
      data,
    });
  }
  async signin(data: TData) {
    return registerAPIInstance.post("/signin", {
      data,
    });
  }
  async user() {
    return registerAPIInstance.get("/user");
  }
  async logout() {
    return registerAPIInstance.post("/logout");
  }
}

export default new AuthApi();
