import LoginAPI from "src/api/auth";

type TLoginFormModal = {
  login: "string";
  password: "string";
};

const loginAPI = new LoginAPI();

export default class UserLoginController {
  public async login(data: TLoginFormModal) {
    try {
      console.log("data", data);
      // loginAPI.signin();
    } catch (error) {
      console.error("error");
    }
  }
}
