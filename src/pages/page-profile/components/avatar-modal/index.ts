import Block, { BlockProps } from "src/core/block";
import FileForm from "src/pages/page-profile/components/file-form";

import css from "./style.module.css";

export default class ProfileAvatarModal extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      Form: new FileForm({ title: "Загрузить файл", onClose: props.onClose }),
      show: false,
    });
  }

  render(): string {
    return `
        <div>
          {{#if show}}
            <div class="${css.modal}">
              {{{ Form }}}
            </div>
          {{/if}}
        </div>
      `;
  }
}
