import auth from "src/api/auth";
import Block from "src/core/block";
import router from "src/core/router";
import { validate } from "src/helpers";
import controller from "src/pages/page-login/controller";
import { ButtonLink, RButton, RInput } from "src/partials";

export default class FormLogin extends Block {
  init() {
    // auth.logout();
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

    const Signup = new ButtonLink({
      text: "Нет аккаунта?",
      type: "submit",
      class: "login",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          router.go("/sign-up");
        },
      },
    });

    this.children = {
      Login,
      Password,
      LoginButton,
      Signup,
    };
  }

  onChangeLogin(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.Login);
  }

  onChangePassword(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.Password);
  }

  onLogin(e: Event) {
    e.preventDefault();
    // const isValid = validateForm(this.children);

    // if (isValid) {
    // const props = {
    //   login: this.children.Login.props.value,
    //   password: this.children.Password.props.value,
    // };
    // const props = {
    //   login: "ivan",
    //   password: "qweQWE123",
    // };

    const props = {
      login: "ivan2",
      password: "qweQWE123",
    };

    controller.signin(props);

    // console.log(props);
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
      </div>
    `;
  }
}
