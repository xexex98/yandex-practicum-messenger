import Block from "src/core/block";

import css from "./style.module.css";

type Props = {
  href: string;
  class?: string;
  label: string;
};

export default class RLink extends Block {
  constructor(props: Props) {
    super(props);
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
