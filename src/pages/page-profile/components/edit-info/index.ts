import ProfileEditInfoField from "src/pages/page-profile/components/edit-info-field";
import { RButton } from "src/partials";
import Block from "src/reactivity/block";

export default class ProfileEditInfo extends Block {
  init() {
    const Email = new ProfileEditInfoField({
      label: "Почта",
      name: "email",
      events: {
        mouseenter: (e) => console.log(e.target.value),
      },
    });

    const Login = new ProfileEditInfoField({
      label: "Логин",
      name: "login",
      events: {
        change: (e) => console.log(e.target.value),
      },
    });

    const FirstName = new ProfileEditInfoField({ label: "Имя", name: "first_name" });

    const SecondName = new ProfileEditInfoField({
      label: "Фамилия",
      name: "second_name",
    });

    const DisplayName = new ProfileEditInfoField({
      label: "Имя в чате",
      name: "display_name",
    });

    const Phone = new ProfileEditInfoField({
      label: "Телефон",
      name: "phone",
    });

    const Save = new RButton({
      text: "Сохранить",
      type: "submit",
      onClick: (e) => {
        e.preventDefault();
        this.props.onSaveEdit();
        this.hide();
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
