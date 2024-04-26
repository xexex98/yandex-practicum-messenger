import Block from "../../core/block";

import css from "./style.module.css";

type TProps = {
  error: string;
  description: string;
  href?: string;
};

export default class ErrorPagesLayout extends Block {
  constructor(props: TProps) {
    super(props);
  }
  render() {
    return `
      <div class="${css.container}">
        <h3 class="${css.code}">{{ error }}</h3>
        <p class="${css.description}">{{ description }}</p>
        <a class="${css.back}" href="#">Назад к чатам</a>
      </div>
    `;
  }
}
