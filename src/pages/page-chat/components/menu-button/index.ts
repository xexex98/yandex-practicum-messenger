import Block from "src/reactivity/block";

export default class MenuButton extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        click: () => this.props.onClick(),
      },
    });
  }

  render(): string {
    return `
      <p>{{ title }}<p>
    `;
  }
}
