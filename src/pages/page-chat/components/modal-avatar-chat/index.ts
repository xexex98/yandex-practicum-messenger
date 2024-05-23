import Block, { BlockProps } from "src/core/block";
import FileForm from "src/pages/page-chat/components/file-form";

import css from "./style.module.css";

export default class ModalChatAvatar extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      Form: new FileForm({ title: "Загрузить файл", onClose: props.onClose }),
      show: false,
    });
  }

  render(): string {
    return `
      <div class="${css.modal} {{#if show}}${css.show}{{/if}} ">
        {{{ Form }}}
      </div>
    `;
  }
}
