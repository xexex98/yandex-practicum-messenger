import Block from "src/core/block";

import css from "./style.module.css";

type Props = {
  href: string;
  class?: string;
  label: string;
  onClick: (e?: Event) => void;
};

export default class RLinkWithEvent extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return `
      <a
        href="{{ href }}"
        class="${css.link} {{ class }}"
      >
        {{ label }}
      </a>
`;
  }
}
