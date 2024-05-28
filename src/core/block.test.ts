import { expect } from "chai";
import Handlebars from "handlebars";
import sinon from "sinon";
import Block from "src/core/block";

describe("Block", () => {
  let block: Block;
  let stubTemplate: sinon.SinonStub;

  beforeEach(() => {
    stubTemplate = sinon.stub(Handlebars, "compile").returns(() => "<div></div>");

    block = new Block();
  });

  afterEach(() => {
    stubTemplate.restore();
  });

  it("should initialize with an ID", () => {
    expect(block).to.have.property("_id").that.is.a("string");
  });

  it("should call componentDidMount on _componentDidMount", () => {
    const spy = sinon.spy(block, "componentDidMount");

    block["_componentDidMount"]();
    expect(spy.calledOnce).to.be.true;
  });

  it("should render correctly", () => {
    block["render"] = () => "<div>{{content}}</div>";
    block["props"] = { content: "Hello, world!" };
    block["_render"]();

    const element = block.getContent();

    console.log(element);
    expect(element?.outerHTML).to.equal("<div>Hello, world!</div>");
  });

  it("should update props correctly", () => {
    const oldProps = { content: "old" };
    const newProps = { content: "new" };

    block["props"] = oldProps;
    block.setProps(newProps);

    expect(block["props"]).to.deep.equal(newProps);
  });

  it("should add and remove events", () => {
    const clickHandler = sinon.spy();

    block["props"] = { events: { click: clickHandler } };

    const element = document.createElement("div");

    block["_element"] = element;
    block["_addEvents"]();

    element.click();
    expect(clickHandler.calledOnce).to.be.true;

    block["_removeEvents"]();
    element.click();
    expect(clickHandler.calledOnce).to.be.true;
  });

  it("should hide and show the element", () => {
    const element = document.createElement("div");

    block["_element"] = element;

    block.hide();
    expect(element.style.display).to.equal("none");

    block.show();
    expect(element.style.display).to.equal("block");
  });
});
