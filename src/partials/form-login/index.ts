import { RButton } from "src/partials/r-button";
import RInput from "src/partials/r-input";
import RLink from "src/partials/r-link";
import Block from "src/reactivity/block";

export default class FormLogin extends Block {
  init() {
    const onChangeLoginBind = this.onChangeLogin.bind(this);

    const Login = new RInput({
      label: "Логин",
      name: "login",
      errorText: "Неверный логин",
      onBlur: onChangeLoginBind,
    });

    const Password = new RInput({
      label: "Пароль",
      name: "password",
      errorText: "Неверный пароль",
      required: true,
    });
    const LoginButton = new RButton({
      text: "Авторизоваться",
    });
    const Signup = new RLink({
      href: "#",
      class: "signup",
      label: "Нет аккаунта?",
    });

    this.children = {
      ...this.children,
      Login,
      Password,
      LoginButton,
      Signup,
    };
  }

  onChangeLogin(e) {
    const inputValue = e.target.value;

    console.log(inputValue);
    if (inputValue === "error") {
      this.children.Login.setProps({
        error: true,
      });
      return;
    } else {
      this.children.Login.setProps({ error: false, errorText: null });
    }
  }

  render() {
    return `
      <div>
        <div>
          {{{ Login }}}
          {{{ Password }}}
        </div>
        <div>
          {{{ LoginButton }}}
          {{{ Signup }}}
        </div>
      </div>`;
  }
}
