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
      store.set("error", true);
      console.error(`Error in: class LoginController -> signin -> ${error as string}`);
    } finally {
      store.set("loading", false);
    }
  }

  // const props = {
  //   login: "ivan",
  //   password: "qweQWE123",
  // };

  // const props = {
  //   login: "ivan2",
  //   password: "qweQWE123",
  // };
  public async me() {
    try {
      await auth.user();
      router.go("/messenger");
    } catch (error) {
      console.error(`Error in: class LoginController -> signin -> ${error as string}`);
    }
  }
}

export default new LoginController();
