import Block from "src/reactivity/block";

import css from "./style.module.css";

type Props = {
  href: string;
  class?: string;
  label: string;
  onClick?: () => void;
};

export default class RLink extends Block {
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
