import auth from "src/api/auth";
import router from "src/core/router";

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
      await auth.signup(data);
      router.go("/messenger");
    } catch (error) {
      console.error("Error in: class RegistrationController");
    }
  }
}

export default new RegistrationController();
