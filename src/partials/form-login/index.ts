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
      errorText: "Неверный логин",
      onBlur: onChangeLoginBind,
    });

    const Password = new RInput({
      label: "Пароль",
      name: "password",
      type: "password",
      errorText: "Неверный пароль",
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

  onChangeLogin(e) {
    const inputValue = e.target.value;
    const regex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/.test(inputValue);

    if (!regex) {
      this.children.Login.setProps({
        errorText: "Некорректный логин",
        error: true,
      });
      return;
    } else {
      this.children.Login.setProps({ error: false, errorText: null, login: inputValue });
    }
  }

  onChangePassword(e) {
    const inputValue = e.target.value;
    const regex = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/.test(inputValue);

    if (!regex) {
      this.children.Password.setProps({
        errorText: "Некорректный пароль",
        error: true,
      });
      return;
    } else {
      this.children.Password.setProps({ error: false, errorText: null, password: inputValue });
    }
  }

  onLogin(e) {
    e.preventDefault();

    console.log({
      login: this.children.Login.props.login,
      password: this.children.Password.props.password,
    });
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
