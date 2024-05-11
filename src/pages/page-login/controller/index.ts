import LoginAPI from "src/api/login";
import router from "src/core/router";

type LoginForm = {
  login: string;
  password: string;
};

const api = new LoginAPI();

class LoginController {
  public async signin(data: LoginForm) {
    try {
      await api.signin(data);
      router.go("/messenger");
    } catch (error) {
      console.error("Error in: class LoginController");
    }
  }
}
const login = new LoginController();

export default login;
