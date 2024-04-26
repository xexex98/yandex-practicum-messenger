import Handlebars from "handlebars";
import { v4 as uuidv4 } from "uuid";

import EventBus from "./event-bus";

interface EventMap {
  [key: string]: (event: Event) => void;
}

interface BlockProps {
  events?: EventMap;
  [key: string]: unknown;
}

interface BlockChildrenMap {
  [key: string]: Block;
}

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  id: string = uuidv4();

  _element: HTMLElement | null = null;

  props: BlockProps;
  children: BlockChildrenMap;

  eventBus: () => EventBus;

  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.props = this._makePropsProxy({ ...props });
    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
    }
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {}

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }
    this._render();
  }

  //TODO! реализовать проверку на изменение пропсов
  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (oldProps === newProps) {
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

  _render() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (events[eventName]) {
          this._element?.removeEventListener(eventName, events[eventName]);
        }
      });
    }

    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement("template");

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild as HTMLElement;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      stub?.replaceWith(child.getContent() as Node);
    });

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  render() {}

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

  _createDocumentElement(tagName: string): HTMLTemplateElement {
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
