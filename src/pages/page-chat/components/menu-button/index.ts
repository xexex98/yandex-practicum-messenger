import Block from "src/core/block";

type TProps = {
  title: string;
  onClick: (e?: Event) => void;
};
export default class MenuButton extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render(): string {
    return `
      <p>{{ title }}<p>
    `;
  }
}
