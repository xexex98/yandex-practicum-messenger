import Block from "src/core/block";

export default class MenuButton extends Block {
  render(): string {
    return `
      <p>{{ title }}<p>
    `;
  }
}
