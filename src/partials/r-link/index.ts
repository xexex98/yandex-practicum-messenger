import { Props } from "src/partials/r-link/r-links";
import Block from "src/reactivity/block";

import css from "./style.module.css";

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
