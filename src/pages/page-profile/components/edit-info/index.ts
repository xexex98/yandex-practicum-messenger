import { validate } from "src/helpers";
import ProfileEditInfoField from "src/pages/page-profile/components/edit-info-field";
import { RButton } from "src/partials";
import Block from "src/reactivity/block";

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
        console.log(this.props);
        e.preventDefault();
        this.props.onSaveEdit();
        this.hide();
        console.log({
          email: this.children.Email.props.email,
          login: this.children.Login.props.login,
          first_name: this.children.FirstName.props.first_name,
          second_name: this.children.SecondName.props.second_name,
          display_name: this.children.DisplayName.props.display_name,
          phone: this.children.Phone.props.phone,
        });
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
