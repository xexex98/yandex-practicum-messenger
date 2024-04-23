import ProfileInfoField from "src/pages/page-profile/components/profile-info-field";
import Block from "src/reactivity/block";

export default class ProfileInfo extends Block {
  init() {
    const Email = new ProfileInfoField({
      label: "Почта",
      name: "email",
      value: "pochta@yandex.ru",
    });
    const Login = new ProfileInfoField({ label: "Логин", name: "login", value: "Ivan" });
    const FirstName = new ProfileInfoField({ label: "Имя", name: "first_name", value: "Иван" });
    const SecondName = new ProfileInfoField({
      label: "Фамилия",
      name: "second_name",
      value: "Иванов",
    });
    const DisplayName = new ProfileInfoField({
      label: "Имя в чате",
      name: "display_name",
      value: "Иван",
    });
    const Phone = new ProfileInfoField({
      label: "Телефон",
      name: "phone",
      value: "+7 (909) 967 30 30",
    });

    this.children = {
      ...this.children,
      Email,
      Login,
      FirstName,
      SecondName,
      DisplayName,
      Phone,
    };
  }

  render() {
    return `
      <div>
        {{{ Email }}}
        {{{ Login }}}
        {{{ FirstName }}}
        {{{ SecondName }}}
        {{{ DisplayName }}}
        {{{ Phone }}}
      </div>
    `;
  }
}
