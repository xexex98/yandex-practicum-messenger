import Block, { BlockProps } from "src/core/block";
import LoadFile from "src/pages/page-profile/components/load-file";

import css from "./style.module.css";

export default class FileForm extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      Load: new LoadFile({ onClose: props.onClose }),
    });
  }

  public render(): string {
    return `
      <div class="${css.container}">
        <p class="${css.title}">{{ title }}</p>
        {{{ Load }}}
      </form>
    `;
  }
}
