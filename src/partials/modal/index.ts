import Block from "src/core/block";
import CloseModal from "src/partials/modal/close";

import css from "./style.module.css";

export default class Modal extends Block {
  init(): void {
    const onCloseBind = this.onClose.bind(this);

    const Close = new CloseModal({
      events: {
        click: onCloseBind,
      },
    });

    this.children = {
      ...this.children,
      Close,
    };
  }

  onClose(e: Event) {
    e.preventDefault();

    this.setProps({
      show: false,
    });
  }

  render() {
    return `
      <div class="${css.modal} {{#if show}}${css.show}{{/if}} ">
        <div class="${css.content}">
          <p class="${css.title}">{{ title }}</p>
          {{{ Close }}}
          {{{ body }}}
        </div>
      </div>
    `;
  }
}
