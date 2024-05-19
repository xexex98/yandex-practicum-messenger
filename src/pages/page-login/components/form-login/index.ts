import Block from "src/core/block";
import connect from "src/core/connect";
import router from "src/core/router";
import { validate, validateForm } from "src/helpers";
import controller from "src/pages/page-login/controller";
import { ButtonLink, RButton, RInput } from "src/partials";

import css from "./style.module.css";

class FormLogin extends Block {
  init() {
    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onChangePasswordBind = this.onChangePassword.bind(this);
    const onLoginBind = this.onLogin.bind(this);

    const Login = new RInput({
      label: "Логин",
      name: "login",
      type: "text",
      events: {
        blur: onChangeLoginBind,
      },
    });

    const Password = new RInput({
      label: "Пароль",
      name: "password",
      type: "password",
      events: {
        blur: onChangePasswordBind,
      },
    });

    const LoginButton = new RButton({
      text: "Авторизоваться",
      type: "submit",
      events: {
        click: onLoginBind,
      },
    });

    const Signup = new ButtonLink({
      text: "Нет аккаунта?",
      type: "button",
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
    validate((e?.target as HTMLInputElement)?.value, this.children.Login);
  }

  onChangePassword(e?: Event) {
    validate((e?.target as HTMLInputElement)?.value, this.children.Password);
  }

  onLogin(e: Event) {
    e.preventDefault();

    const isValid = validateForm(this.children);

    if (isValid) {
      const props = {
        login: this.children.Login.props.value as string,
        password: this.children.Password.props.value as string,
      };

      void controller.signin(props);
    }
  }

  public render(): string {
    return `
      <div>
        <div>
          {{{ Login }}}
          {{{ Password }}}
        </div>  
        <div>
          {{#if isSomeEmpty }}
            <p class="${css.error}">Все поля должны быть заполнены</p>
          {{/if}}
          {{{ LoginButton }}}
          {{{ Signup }}}
        </div>
      </div>
    `;
  }
}

export default connect(({ error, isSomeEmpty }) => ({ error, isSomeEmpty }))(FormLogin);
