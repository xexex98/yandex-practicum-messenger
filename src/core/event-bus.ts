type TFunction = (...args: unknown[]) => void;
type TListeners = Record<string, TFunction[]>;

export default class EventBus {
  private _listeners: TListeners = {};

  constructor() {
    this._listeners = {};
  }

  on(event: string, callback: TFunction) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(callback);
  }

  off(event: string, callback: TFunction) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event].forEach((listener) => listener(...args));
  }
}
