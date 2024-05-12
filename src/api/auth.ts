import BaseAPI from "src/api/base-api";
import HTTP from "src/core/XMLHttpRequest";

const registerAPIInstance = new HTTP("auth");

type TData = Record<string, unknown>;

class AuthApi extends BaseAPI {
  public async signup(data: TData) {
    return registerAPIInstance.post("/signup", {
      data,
    });
  }

  public async signin(data: TData) {
    return registerAPIInstance.post("/signin", {
      data,
    });
  }

  public async user() {
    return registerAPIInstance.get("/user");
  }

  public async logout() {
    return registerAPIInstance.post("/logout");
  }
}

export default new AuthApi();
