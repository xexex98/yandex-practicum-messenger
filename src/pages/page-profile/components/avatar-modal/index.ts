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
      Button: new RButton({
        text: "Поменять",
        type: "button",
      }),
    });
  }

  render(): string {
    return `
        <div class="${css.modal}">
          <div class="${css.container}">
            <p class="${css.title}">{{ title }}</p>
            <a class="${css.content}">
              Выбрать файл на <br />
              компьютере
            </a>
            <div class="${css.button}">
              {{{ Button }}}
            </div>
            <p class="${css.error}">Нужно выбрать файл</p>
          </div>
        </div>
      `;
  }
}
