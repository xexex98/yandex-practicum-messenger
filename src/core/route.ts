import Block from "src/core/block";
import trim from "src/helpers/trim";

type TProps = {
  rootQuery: string;
};

export default class Route<T extends Block = Block> {
  private _pathname: string;
  private _blockClass: new () => T;
  private _block: T | null;
  private _props: TProps;

  constructor(pathname: string, view: new () => T, props: TProps) {
    this._pathname = trim(pathname);
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public leave(): void {
    if (this._block) {
      this._block = null;
    }
  }

  public match(pathname: string): boolean {
    return trim(pathname) === this._pathname;
  }

  public render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
      this._render(this._props.rootQuery as string, this._block);

      return;
    }

    this._block.show();
  }

  private _render(query: string, block: Block): void {
    const root = document.querySelector(query);

    if (!root) {
      throw Error(`render: Не удалось найти контейнер ${query}`);
    }
    root.textContent = "";
    root.appendChild(block.getContent() as HTMLElement);
  }
}
