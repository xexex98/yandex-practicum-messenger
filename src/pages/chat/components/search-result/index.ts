import Block from "src/reactivity/block";

import css from "./style.module.css";

type TProps = {
  result: string;
};
export default class SearchResult extends Block {
  constructor(props: TProps) {
    super(props);
  }
  render(): string {
    return `
      <div class="${css.result}">
        <div class="${css.border} ${css.top}"></div>
        <div class="${css.avatar}"></div>
        <p class="${css.search}">{{ result }}</p>
        <div class="${css.border} ${css.bottom}"></div>
      </div>
    `;
  }
}
