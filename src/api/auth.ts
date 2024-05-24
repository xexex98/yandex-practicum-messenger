import BaseAPI from "src/api/base-api";
import HTTP from "src/core/XMLHttpRequest";

const auth = new HTTP("auth");

type TData = Record<string, unknown>;

class AuthApi extends BaseAPI {
  public async signup(data: TData) {
    return auth.post("/signup", {
      data,
    });
  }

  public async signin(data: TData) {
    return auth.post("/signin", {
      data,
    });
  }

  public async user() {
    return auth.get("/user");
  }

  public async logout() {
    return auth.post("/logout");
  }
}

export default new AuthApi();
