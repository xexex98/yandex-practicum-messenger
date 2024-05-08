import Handlebars from "handlebars";
import isEqual from "src/helpers/is-equal";
import { v4 as uuidv4 } from "uuid";

import EventBus from "./event-bus";

export type BlockProps = {
  events?: Record<string, EventListener>;
  [key: string]: unknown;
};

type BlockChildrenMap = {
  [key: string]: Block;
};

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _id: string = uuidv4();

  private _element: HTMLElement | null = null;

  protected children: BlockChildrenMap;

  protected eventBus: () => EventBus;

  public props: BlockProps;

  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.props = this._makePropsProxy({ ...props });
    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private _removeEvents() {
    const { events } = this.props;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      if (events[eventName]) {
        this._element?.removeEventListener(eventName, events[eventName]);
      }
    });
  }
  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {}

  _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child: unknown) => {
      if (child instanceof Block) {
        child.dispatchComponentDidMount();
      }
    });
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(...args: unknown[]) {
    const [oldProps, newProps]: BlockProps[] = args as [BlockProps, BlockProps];
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._render();
    }
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    return true;
  }

  _getChildrenAndProps(propsAndChildren: BlockProps): {
    children: BlockChildrenMap;
    props: BlockProps;
  } {
    const children: BlockChildrenMap = {};
    const props: BlockProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    this._removeEvents();

    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement("template");

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    const newElement = fragment.content.firstElementChild as HTMLElement;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent() as HTMLElement);
    });

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  render(): void {}

  getContent(): HTMLElement | null {
    return this.element;
  }

  _updateComponent(oldTarget: BlockProps, target: BlockProps) {
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
  }

  _makePropsProxy(props: BlockProps): BlockProps {
    const updateComponentBind = this._updateComponent.bind(this);

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target, prop: string, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        updateComponentBind(oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error("No access");
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  show(display: string = "block") {
    const content = this.getContent();

    if (content) {
      content.style.display = display;
    }
  }

  hide() {
    const content = this.getContent();

    if (content) {
      content.style.display = "none";
    }
  }
}

export default Block;
