import LoadFile from "src/pages/page-profile/components/load-file";
import { RButton } from "src/partials";
import Block from "src/reactivity/block";

import css from "./style.module.css";

type Props = {
  title: string;
};

export default class ProfileAvatarModal extends Block {
  constructor(props: Props) {
    super({
      ...props,
      Load: new LoadFile({}),

      Button: new RButton({
        text: "Поменять",
        type: "button",
        onClick: () => this.setProps({ error: true }),
      }),

      Close: new RButton({
        text: "Закрыть",
        type: "button",
        onClick: () => {
          this.setProps({ error: false });
          this.hide();
        },
      }),
    });
  }

  render(): string {
    return `
        <div class="${css.modal}">
          <div class="${css.container}">
            <p class="${css.title}">{{ title }}</p>
            <div class=${css.load}>
              <label for="file" class="${css.content}">
                Выбрать файл на <br />
                компьютере
                {{{ Load }}}
              </label>
            </div>
            <div class="${css.buttons}">
              {{{ Button }}}
              {{{ Close }}}
            </div>
            <p class="${css.error} {{#if error}}${css.show}{{/if}}">Нужно выбрать файл</p>
          </div>
        </div>
      `;
  }
}
