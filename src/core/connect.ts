import Block, { BlockProps } from "src/core/block";
import store, { StoreEvents } from "src/core/store";

type Indexed = Record<string, unknown>;

export default function connect(
  Component: typeof Block,
  mapStateToProps: (state: Indexed) => Indexed
) {
  return class extends Component {
    constructor(...props: BlockProps[]) {
      super(...props, mapStateToProps(store.getState()));

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
