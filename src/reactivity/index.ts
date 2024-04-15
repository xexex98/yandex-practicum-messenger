import { v4 as uuidv4 } from "uuid";

import EventBus from "./event-bus.ts";

type TTarget = Record<string, unknown>;

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element;
  private _meta;
  private _eventBus: () => EventBus;
  private _id = uuidv4();

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;

    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();

    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps) {
    //dispatchComponentDidMount
  }

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TTarget, newProps: TTarget) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      return;
    }
    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();

    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду

    this._element.innerHTML = block;
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: TTarget) {
    const eventBus = this._eventBus;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target, prop: string, value: TTarget[string]) {
        target[prop] = value;
        eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },

      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block;
