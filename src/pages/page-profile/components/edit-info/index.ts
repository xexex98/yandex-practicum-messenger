import Block from "src/core/block";
import { validate, validateForm } from "src/helpers";
import ProfileEditInfoField from "src/pages/page-profile/components/edit-info-field";
import { RButton } from "src/partials";

export default class ProfileEditInfo extends Block {
  init() {
    const Email = new ProfileEditInfoField({
      label: "Почта",
      name: "email",
      onBlur: (e) => validate(e.target.value, this.children.Email),
    });

    const Login = new ProfileEditInfoField({
      label: "Логин",
      name: "login",
      onBlur: (e) => validate(e.target.value, this.children.Login),
    });

    const FirstName = new ProfileEditInfoField({
      label: "Имя",
      name: "first_name",
      onBlur: (e) => validate(e.target.value, this.children.FirstName),
    });

    const SecondName = new ProfileEditInfoField({
      label: "Фамилия",
      name: "second_name",
      onBlur: (e) => validate(e.target.value, this.children.SecondName),
    });

    const DisplayName = new ProfileEditInfoField({
      label: "Имя в чате",
      name: "display_name",
      onBlur: (e) => validate(e.target.value, this.children.DisplayName),
    });

    const Phone = new ProfileEditInfoField({
      label: "Телефон",
      name: "phone",
      onBlur: (e) => validate(e.target.value, this.children.Phone),
    });

    const Save = new RButton({
      text: "Сохранить",
      onClick: (e) => {
        e.preventDefault();

        const isValid = validateForm(this.children);

        if (isValid) {
          this.props.onSaveEdit();
          this.hide();
          console.log({
            email: this.children.Email.props.value,
            login: this.children.Login.props.value,
            first_name: this.children.FirstName.props.value,
            second_name: this.children.SecondName.props.value,
            display_name: this.children.DisplayName.props.value,
            phone: this.children.Phone.props.value,
          });
        }
      },
    });

    this.children = {
      ...this.children,
      Email,
      Login,
      FirstName,
      SecondName,
      DisplayName,
      Phone,
      Save,
    };
  }

  render() {
    return `
      <form action="#">
        {{{ Email }}}
        {{{ Login }}}
        {{{ FirstName }}}
        {{{ SecondName }}}
        {{{ DisplayName }}}
        {{{ Phone }}}
        {{{ Save }}}
      </form>
    `;
  }
}
