import Block from "src/core/block";
import store, { StoreEvents } from "src/core/store";
import isEqual from "src/helpers/is-equal";

type Indexed = Record<string, unknown>;

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props?: Indexed) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          console.log(state, newState);
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}
