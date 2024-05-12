import EventBus from "src/core/event-bus";
import set from "src/helpers/set";

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private _state = {};

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown): void {
    set(this._state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
