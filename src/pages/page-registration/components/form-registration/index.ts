import { validate, validateForm } from "src/helpers";
import RButton from "src/partials/r-button";
import RInput from "src/partials/r-input";
import RLink from "src/partials/r-link";
import Block from "src/reactivity/block";

export default class FormRegistration extends Block {
  init() {
    const onChangeEmailBind = this.onChangeEmail.bind(this);
    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onChangeNameBind = this.onChangeName.bind(this);
    const onChangeSurnameBind = this.onChangeSurname.bind(this);
    const onChangePhoneBind = this.onChangePhone.bind(this);
    const onChangePasswordBind = this.onChangePassword.bind(this);
    const onChangePasswordRetryBind = this.onChangePasswordRetry.bind(this);

    const onRegisterBind = this.onRegister.bind(this);

    const Email = new RInput({
      label: "Почта",
      name: "email",
      type: "text",
      onBlur: onChangeEmailBind,
    });
    const Login = new RInput({
      label: "Логин",
      name: "login",
      type: "text",
      onBlur: onChangeLoginBind,
    });
    const Name = new RInput({
      label: "Имя",
      name: "first_name",
      type: "text",
      onBlur: onChangeNameBind,
    });

    const Surname = new RInput({
      label: "Фамилия",
      name: "second_name",
      type: "text",
      onBlur: onChangeSurnameBind,
    });

    const Phone = new RInput({
      label: "Телефон",
      name: "phone",
      type: "text",
      errorText: "Неверный логин",
      onBlur: onChangePhoneBind,
    });

    const Password = new RInput({
      label: "Пароль",
      name: "password",
      type: "password",
      onBlur: onChangePasswordBind,
    });

    const PasswordRetry = new RInput({
      label: "Пароль (еще раз)",
      name: "password_check",
      type: "password",
      onBlur: onChangePasswordRetryBind,
    });

    const Register = new RButton({
      text: "Зарегистрироваться",
      type: "submit",
      onClick: onRegisterBind,
    });

    const Signin = new RLink({
      href: "#",
      class: "signup",
      label: "Войти",
    });

    this.children = {
      ...this.children,
      Email,
      Login,
      Name,
      Surname,
      Phone,
      Password,
      PasswordRetry,
      Register,
      Signin,
    };
  }

  onChangeEmail(e: Event) {
    validate((e.target as HTMLInputElement).value, this.children.Email);
  }
  onChangeLogin(e: Event) {
    validate((e.target as HTMLInputElement).value, this.children.Login);
  }
  onChangeName(e: Event) {
    validate((e.target as HTMLInputElement).value, this.children.Name);
  }
  onChangeSurname(e: Event) {
    validate((e.target as HTMLInputElement).value, this.children.Surname);
  }
  onChangePhone(e: Event) {
    validate((e.target as HTMLInputElement).value, this.children.Phone);
  }
  onChangePassword(e: Event) {
    validate((e.target as HTMLInputElement).value, this.children.Password);
  }
  onChangePasswordRetry(e: Event) {
    validate((e.target as HTMLInputElement).value, this.children.PasswordRetry);
  }

  onRegister(e: Event) {
    e.preventDefault();

    const isValid = validateForm(this.children);

    if (!isValid) {
      const props = {
        email: this.children.Email.props.value,
        login: this.children.Login.props.value,
        password: this.children.Password.props.value,
      };

      console.log(props);
    }
  }

  render() {
    return `
      <div>
        <div>
          {{{ Email }}}
          {{{ Login }}}
          {{{ Name }}}
          {{{ Surname }}}
          {{{ Phone }}}
          {{{ Password }}}
          {{{ PasswordRetry }}}
        </div>
        <div>
          {{{ Register }}}
          {{{ Signin }}}
        </div>
      </div>
    `;
  }
}
