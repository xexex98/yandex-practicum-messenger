import Block from "src/core/block";

import css from "./style.module.css";

type TProps = {
  text: string;
  type: string;
  class?: string;
  events?: Record<string, EventListener>;
};
export default class ButtonLink extends Block {
  constructor(props: TProps) {
    super(props);
  }

  public render(): string {
    return `
      <button class="${css.button} {{ class }}" type="{{ type }}">{{ text }}</button>
    `;
  }
}
