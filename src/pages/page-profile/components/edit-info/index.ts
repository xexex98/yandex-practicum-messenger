import { TUpdateProfile } from "src/api/profile";
import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import router from "src/core/router";
import store from "src/core/store";
import { validate, validateForm } from "src/helpers";
import isEqual from "src/helpers/is-equal";
import ProfileEditInfoField from "src/pages/page-profile/components/edit-info-field";
import controller from "src/pages/page-profile/controller";
import { ApiError, RButton } from "src/partials";

class ProfileEditInfo extends Block {
  init() {
    const Email = new ProfileEditInfoField({
      label: "Почта",
      name: "email",
      onBlur: (e: Event) => validate((e.target as HTMLInputElement).value, this.children.Email),
    });

    const Login = new ProfileEditInfoField({
      label: "Логин",
      name: "login",
      onBlur: (e: Event) => validate((e.target as HTMLInputElement).value, this.children.Login),
    });

    const FirstName = new ProfileEditInfoField({
      label: "Имя",
      name: "first_name",
      onBlur: (e: Event) => validate((e.target as HTMLInputElement).value, this.children.FirstName),
    });

    const SecondName = new ProfileEditInfoField({
      label: "Фамилия",
      name: "second_name",
      onBlur: (e: Event) =>
        validate((e.target as HTMLInputElement).value, this.children.SecondName),
    });

    const DisplayName = new ProfileEditInfoField({
      label: "Имя в чате",
      name: "display_name",
      onBlur: (e: Event) =>
        validate((e.target as HTMLInputElement).value, this.children.DisplayName),
    });

    const Phone = new ProfileEditInfoField({
      label: "Телефон",
      name: "phone",
      onBlur: (e: Event) => validate((e.target as HTMLInputElement).value, this.children.Phone),
    });

    const Save = new RButton({
      disabled: false,
      text: "Сохранить",
      type: "submit",
      onClick: async (e: Event) => {
        e.preventDefault();

        const isValid = validateForm(this.children);

        if (true) {
          await controller.updateProfile({
            email: this.children.Email.props.value,
            login: this.children.Login.props.value,
            first_name: this.children.FirstName.props.value,
            second_name: this.children.SecondName.props.value,
            display_name: this.children.DisplayName.props.value,
            phone: this.children.Phone.props.value,
          } as TUpdateProfile);

          if (
            typeof this.props.onSaveEdit === "function" &&
            store.getState().isProfileEditError === false
          ) {
            this.props.onSaveEdit();
          }
        }
      },
    });

    const Error = new ApiError();

    this.children = {
      ...this.children,
      Email,
      Login,
      FirstName,
      SecondName,
      DisplayName,
      Phone,
      Save,
      Error,
    };
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    this.children.Save.setProps({ disabled: store.getState().loading });
    this.setProps({ isProfileEditError: store.getState().isProfileEditError });

    return true;
  }

  constructor(props: BlockProps) {
    super({ ...props, isProfileEditError: false });
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
        {{#if isProfileEditError}}
          {{{ Error }}}
        {{/if}}
      </form>
    `;
  }
}

export default connect(({ isProfileEditError, loading }) => ({ isProfileEditError, loading }))(
  ProfileEditInfo
);
