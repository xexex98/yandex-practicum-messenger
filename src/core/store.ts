import EventBus from "src/core/event-bus";

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private _state = {};

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    this.set(this._state, path, value);
  }
}

export default new Store();
