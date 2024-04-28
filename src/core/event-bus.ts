type Callback = (...args: unknown[]) => void;

export default class EventBus {
  private _listeners: Record<string, Callback[]>;

  constructor() {
    this._listeners = {};
  }

  on(event: string, callback: Callback) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(callback);
  }

  off(event: string, callback: Callback) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event].forEach((listener) => listener(...args));
  }
}
