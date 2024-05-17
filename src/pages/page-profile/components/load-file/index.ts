import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import controller from "src/pages/page-profile/controller";
import { ApiError, RButton } from "src/partials";

import css from "./style.module.css";

class LoadFile extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      Submit: new RButton({
        text: "Поменять",
        type: "submit",
        onClick: () => {},
      }),

      Close: new RButton({
        text: "Закрыть",
        type: "button",
        onClick: () => {
          if (typeof this.props.onClose === "function") {
            this.props.onClose();
          }
          this.setProps({ error: false });
        },
      }),

      Error: new ApiError(),

      events: {
        submit: (e) => {
          e.preventDefault();
          const avatar = document.getElementById("avatar") as HTMLInputElement;
          const fileForm = document.getElementById("fileForm") as HTMLFormElement;

          const form = new FormData(fileForm);
          const file = avatar.files?.[0];

          if (!file) {
            this.setProps({ error: true });
          } else {
            controller.updateProfileAvatar({ formData: form });
            if (typeof this.props.onClose === "function" && this.props.avatarError !== true) {
              this.props.onClose();
            }
          }
        },
      },
    });
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    this.children.Submit.setProps({ disabled: store.getState().loading });
    return true;
  }

  render(): string {
    return `
      <form id="fileForm" class=${css.load}>
        <input type="file" id="avatar" name="avatar" class="${css.input}" accept="image/*"  />
        <div class="${css.buttons}">
          {{{ Submit }}}
          {{{ Close }}}
          {{#if avatarError}}
            {{{ Error }}}
          {{/if}}
        </div>
        <p class="${css.error} {{#if error}}${css.show}{{/if}}">Нужно выбрать файл</p> 
      </form>
    `;
  }
}

export default connect(({ avatarError, loading }) => ({ avatarError, loading }))(LoadFile);
