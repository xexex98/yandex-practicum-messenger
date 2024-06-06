import { expect } from "chai";
import sinon from "sinon";
import Block, { BlockProps } from "src/core/block";

describe("Block", () => {
  class TestBlock extends Block {
    constructor(props: BlockProps = {}) {
      super(props);
    }
    render() {
      return `<main><div class="test">{{content}}</div></main>`;
    }
  }

  it("should initialize with an ID", () => {
    const block = new TestBlock();

    expect(block).to.have.property("_id").that.is.a("string");
  });

  it("should call componentDidMount on _componentDidMount", () => {
    const block = new TestBlock();
    const spy = sinon.spy(block, "componentDidMount");

    block["_componentDidMount"]();
    expect(spy.calledOnce).to.be.true;
  });

  it("should initialize with props", () => {
    const props = { content: "Hello" };
    const block = new TestBlock(props);

    expect(block.props).to.deep.equal(props);
  });

  it("should correctly render with string prop 'hello world'", () => {
    const props = { content: "hello world" };
    const block = new TestBlock(props);

    block["_render"]();
    const element = block.getContent() as HTMLElement;

    expect(element).to.not.be.null;
    expect(element.querySelector(".test")?.innerHTML).to.equal("hello world");
  });

  it("should update props correctly", () => {
    const block = new TestBlock({ content: "old" });
    const newProps = { content: "new" };

    block.setProps(newProps);

    expect(block.props).to.deep.equal(newProps);
  });

  it("should add and remove events", () => {
    const clickHandler = sinon.spy();
    const props = { events: { click: clickHandler } };
    const block = new TestBlock(props);

    const element = document.createElement("div");

    block["_element"] = element;
    block["_addEvents"]();

    element.click();
    expect(clickHandler.calledOnce).to.be.true;

    block["_removeEvents"]();
    element.click();
    expect(clickHandler.calledOnce).to.be.true;
  });

  it("should show and hide the block", () => {
    const block = new TestBlock();

    block["_element"] = document.createElement("div");
    block.show();
    expect(block.element?.style.display).to.equal("block");
    block.hide();
    expect(block.element?.style.display).to.equal("none");
  });
});
