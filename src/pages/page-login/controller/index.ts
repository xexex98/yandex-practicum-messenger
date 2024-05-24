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

      store.set("error", false);
      router.go("/messenger");
    } catch (error) {
      if (error === "User already in system") {
        router.go("/messenger");
      }
      store.set("error", true);
      console.error(`Error in: class LoginController -> signin -> ${error as string}`);
    } finally {
      store.set("loading", false);
    }
  }
}

export default new LoginController();
