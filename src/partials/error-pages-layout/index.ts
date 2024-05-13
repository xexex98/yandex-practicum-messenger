import Block from "src/core/block";
import router from "src/core/router";
import ButtonLink from "src/partials/button-link";

import css from "./style.module.css";

type TProps = {
  error: string;
  description: string;
  href?: string;
};

export default class ErrorPagesLayout extends Block {
  init(): void {
    const goBack = new ButtonLink({
      text: "Вернуться обратно",
      type: "button",
      events: {
        click: () => router.back(),
      },
    });

    this.children = {
      goBack,
    };
  }

  constructor(props: TProps) {
    super(props);
  }

  render(): string {
    return `
      <div class="${css.container}">
        <h3 class="${css.code}">{{ error }}</h3>
        <p class="${css.description}">{{ description }}</p>
        {{{ goBack }}}
      </div>
    `;
  }
}
