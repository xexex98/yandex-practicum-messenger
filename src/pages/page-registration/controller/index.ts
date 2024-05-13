import auth from "src/api/auth";
import router from "src/core/router";
import store from "src/core/store";

type LoginForm = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

class RegistrationController {
  public async signup(data: LoginForm) {
    try {
      store.set("loading", true);
      store.set("error", false);
      await auth.signup(data);
      router.go("/messenger");
    } catch (error) {
      store.set("error", true);
      console.error("Error in: class RegistrationController");
    } finally {
      store.set("loading", false);
    }
  }
}

export default new RegistrationController();
