import BaseAPI from "src/api/base-api";
import HTTP from "src/core/XMLHttpRequest";

type TRegistration = {
  first_name: "string";
  second_name: "string";
  login: "string";
  email: "string";
  password: "string";
  phone: "string";
};

const registerAPIInstance = new HTTP("auth");

export default class RegistrationAPI extends BaseAPI {
  create() {
    return registerAPIInstance.post("/signup");
  }
  request() {
    return registerAPIInstance.post("/user");
  }
}
