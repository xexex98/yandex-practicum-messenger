import auth from "src/api/auth";
import router from "src/core/router";
import store from "src/core/store";

type LoginForm = {
  login: string;
  password: string;
};

class LoginController {
  public async signin(data: LoginForm) {
    try {
      store.set("loading", true);

      await auth.signin(data);

      router.go("/messenger");
    } catch (error) {
      console.error(`Error in: class LoginController -> signin -> ${error}`);
    } finally {
      store.set("loading", false);
    }
  }
}

export default new LoginController();
