import Block from "src/core/block";
import router from "src/core/router";
import { validate } from "src/helpers";
import controller from "src/pages/page-registration/controller";
import { ButtonLink, RButton, RInput } from "src/partials";

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

    const Signin = new ButtonLink({
      text: "Уже зарегистрированы?",
      type: "submit",
      class: "registration",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          router.go("/");
        },
      },
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

  onChangeEmail(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.Email);
  }
  onChangeLogin(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.Login);
  }
  onChangeName(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.Name);
  }
  onChangeSurname(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.Surname);
  }
  onChangePhone(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.Phone);
  }
  onChangePassword(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.Password);
  }
  onChangePasswordRetry(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.PasswordRetry);
  }

  onRegister(e: Event) {
    e.preventDefault();

    // if (!isValid) {

    // const props = {
    //   email: this.children.Email.props.value,
    //   login: this.children.Login.props.value,
    //   password: this.children.Password.props.value,
    //   repeatNewPassword: this.children.PasswordRetry.props.value,
    // };
    const props = {
      first_name: "Ivan",
      second_name: "Ivan",
      login: "ivan",
      email: "ivan@mail.ru",
      password: "qweQWE123",
      phone: "79555555555",
    };

    controller.signup(props);
    // }
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
