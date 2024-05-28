import { expect } from "chai";
import Block, { BlockProps } from "src/core/block";

describe("Block", () => {
  let PageClass: typeof Block;

  before(() => {
    class Page extends Block {
      constructor(props: BlockProps) {
        super({
          ...props,
        });
      }

      render(): string {
        return `<div>
                  <span id="test-text">{{text}}</span>
                  <button>{{text-button}}</button>
              </div>`;
      }
    }

    PageClass = Page;
  });

  it("Должен создать компонент с состоянием из конструктора", () => {
    const text = "Hello";
    const pageComponent = new PageClass({ text });

    const spanText = pageComponent.element?.querySelector("#test-text")?.innerHTML;

    expect(spanText).to.be.eq(text);
  });
});
