import BaseAPI from "src/api/base-api";
import HTTP from "src/core/XMLHttpRequest";

const registerAPIInstance = new HTTP("auth");

export default class LoginAPI extends BaseAPI {
  signin() {
    return registerAPIInstance.post("/signin");
  }
}
