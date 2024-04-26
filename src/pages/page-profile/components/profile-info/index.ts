import Block from "src/core/block";
import ProfileInfoField from "src/pages/page-profile/components/profile-info-field";

export default class ProfileInfo extends Block {
  init() {
    const Email = new ProfileInfoField({
      label: "Почта",
      value: "pochta@yandex.ru",
    });
    const Login = new ProfileInfoField({ label: "Логин", value: "Ivan" });
    const FirstName = new ProfileInfoField({ label: "Имя", value: "Иван" });
    const SecondName = new ProfileInfoField({
      label: "Фамилия",
      value: "Иванов",
    });
    const DisplayName = new ProfileInfoField({
      label: "Имя в чате",
      value: "Иван",
    });
    const Phone = new ProfileInfoField({
      label: "Телефон",
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
