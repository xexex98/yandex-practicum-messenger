import { validate } from "src/helpers";
import RButton from "src/partials/r-button";
import RInput from "src/partials/r-input";
import RLink from "src/partials/r-link";
import Block from "src/reactivity/block";

export default class FormLogin extends Block {
  init() {
    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onChangePasswordBind = this.onChangePassword.bind(this);
    const onLoginBind = this.onLogin.bind(this);

    const Login = new RInput({
      label: "Логин",
      name: "login",
      type: "text",
      onBlur: onChangeLoginBind,
    });

    const Password = new RInput({
      label: "Пароль",
      name: "password",
      type: "password",
      onBlur: onChangePasswordBind,
    });

    const LoginButton = new RButton({
      text: "Авторизоваться",
      type: "submit",
      onClick: onLoginBind,
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

  onChangeLogin(e: Event) {
    validate((e.target as HTMLInputElement).value, this.children.Login);
  }

  onChangePassword(e: Event) {
    validate((e.target as HTMLInputElement).value, this.children.Password);
  }

  onLogin(e: Event) {
    e.preventDefault();
    // const isValid = validateForm(this.children);

    // if (!isValid) {
    const props = {
      login: this.children.Login.props.value,
      password: this.children.Password.props.value,
    };

    console.log(props);
    // }
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
