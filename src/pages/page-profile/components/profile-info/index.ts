import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import ProfileInfoField from "src/pages/page-profile/components/profile-info-field";

class ProfileInfo extends Block {
  init() {
    const Email = new ProfileInfoField({ label: "Почта" });
    const Login = new ProfileInfoField({ label: "Логин" });
    const FirstName = new ProfileInfoField({ label: "Имя" });
    const SecondName = new ProfileInfoField({ label: "Фамилия" });
    const DisplayName = new ProfileInfoField({ label: "Имя в чате" });
    const Phone = new ProfileInfoField({ label: "Телефон" });

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

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    const user = store.getState().user as Record<string, string | number>;

    this.children.Email.setProps({ value: user.email });
    this.children.Login.setProps({ value: user.login });
    this.children.FirstName.setProps({ value: user.first_name });
    this.children.SecondName.setProps({ value: user.second_name });
    this.children.DisplayName.setProps({ value: user.display_name });
    this.children.Phone.setProps({ value: user.phone });

    return true;
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

export default connect(({ user, render }) => ({ user, render }))(ProfileInfo);
