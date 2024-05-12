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

  protected props: BlockProps;

  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.props = this._makePropsProxy({ ...props });

    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private _removeEvents(): void {
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

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  public init(): void {}

  private _init(): void {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public componentDidMount(): void {}

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child: unknown) => {
      if (child instanceof Block) {
        child._dispatchComponentDidMount();
      }
    });
  }

  private _dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(...args: unknown[]) {
    const [oldProps, newProps]: BlockProps[] = args as [BlockProps, BlockProps];
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._render();
    }
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    return true;
  }

  private _getChildrenAndProps(propsAndChildren: BlockProps): {
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

  public setProps = (nextProps: BlockProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | null {
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

  public render(): string {
    return "";
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  private _updateComponent(oldTarget: BlockProps, target: BlockProps): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
  }

  private _makePropsProxy(props: BlockProps): BlockProps {
    const updateComponentBind = this._updateComponent.bind(this);

    return new Proxy(props, {
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

  public show(display: string = "block"): void {
    const content = this.getContent();

    if (content) {
      content.style.display = display;
    }
  }

  public hide(): void {
    const content = this.getContent();

    if (content) {
      content.style.display = "none";
    }
  }
}

export default Block;
