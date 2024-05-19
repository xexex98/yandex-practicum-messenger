import Block from "src/core/block";
import router from "src/core/router";
import store from "src/core/store";
import { isEqualPassword, validate, validateForm } from "src/helpers";
import { PasswordError } from "src/pages/page-registration/components";
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
      events: {
        blur: onChangeEmailBind,
      },
    });
    const Login = new RInput({
      label: "Логин",
      name: "login",
      type: "text",
      events: {
        blur: onChangeLoginBind,
      },
    });
    const Name = new RInput({
      label: "Имя",
      name: "first_name",
      type: "text",
      events: {
        blur: onChangeNameBind,
      },
    });

    const Surname = new RInput({
      label: "Фамилия",
      name: "second_name",
      type: "text",
      events: {
        blur: onChangeSurnameBind,
      },
    });

    const Phone = new RInput({
      label: "Телефон",
      name: "phone",
      type: "text",
      errorText: "Неверный логин",
      events: {
        blur: onChangePhoneBind,
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

    const PasswordRetry = new RInput({
      label: "Пароль (еще раз)",
      name: "password_check",
      type: "password",
      events: {
        blur: onChangePasswordRetryBind,
      },
    });

    const Register = new RButton({
      text: "Зарегистрироваться",
      type: "submit",
      events: {
        click: onRegisterBind,
      },
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

    const PwdError = new PasswordError();

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
      PwdError,
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

    const isValid = validateForm(this.children);

    if (isValid) {
      const props = {
        email: this.children.Email.props.value as string,
        login: this.children.Login.props.value as string,
        first_name: this.children.Name.props.value as string,
        second_name: this.children.Surname.props.value as string,
        phone: this.children.Phone.props.value as string,
        password: this.children.Password.props.value as string,
        repeatNewPassword: this.children.PasswordRetry.props.value as string,
      };

      if (
        !isEqualPassword(
          this.children.Password.props.value as string,
          this.children.PasswordRetry.props.value as string
        )
      ) {
        store.set("pwdError", true);
        return;
      } else {
        void controller.signup(props);
        store.set("pwdError", false);
      }
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
          {{{ PwdError }}}
        </div>
        <div>
          {{{ Register }}}
          {{{ Signin }}}
        </div>
      </div>
    `;
  }
}
