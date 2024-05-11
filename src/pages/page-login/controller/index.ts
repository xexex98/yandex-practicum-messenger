import auth from "src/api/auth";
import router from "src/core/router";

type LoginForm = {
  login: string;
  password: string;
};

class LoginController {
  public async signin(data: LoginForm) {
    try {
      await auth.signin(data);
      router.go("/messenger");
    } catch (error) {
      console.error("Error in: class LoginController -> signin");
    }
  }
}
const login = new LoginController();

export default login;
