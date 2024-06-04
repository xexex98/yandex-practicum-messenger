import { expect } from "chai";
import { beforeEach } from "mocha";
import sinon from "sinon";
import Block from "src/core/block";
import Router from "src/core/router";

class Temp extends Block {
  constructor() {
    super({});
  }
  render() {
    return `
      <main class="temp">
        <div>Temp</div>
      </main>`;
  }
}

describe("Router", () => {
  let router: typeof Router;

  beforeEach(() => {
    router = Router;
  });

  afterEach(() => {
    sinon.restore();
    router.routes().length = 0;
  });

  it("should call first page render", () => {
    router.use("/", Temp).start();

    expect(document.querySelector(".temp")).to.be.not.null;
  });

  it("should register a new route", () => {
    router.use("/", Temp);

    expect(router.routes().length).to.equal(1);
  });

  it("should navigate back in history", () => {
    const historyGoSpy = sinon.spy(window.history, "go");

    router.back();
    expect(historyGoSpy.calledOnceWith(-1)).to.be.true;
  });

  it("should navigate forward in history", () => {
    const historyForwardSpy = sinon.spy(window.history, "forward");

    router.forward();
    expect(historyForwardSpy.calledOnce).to.be.true;
  });

  it("should not pushState when shh is true", () => {
    const pushStateSpy = sinon.spy(window.history, "pushState");

    router.use("/", Temp);
    router.go("/", true);
    expect(pushStateSpy.notCalled).to.be.true;
  });
});
