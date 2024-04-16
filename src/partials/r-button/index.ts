import Handlebars from "handlebars";

import Block from "../../reactivity";

type TRButton = Record<string, unknown>;

export class RButton extends Block {
  constructor(props: TRButton) {
    super(props);
  }

  render() {
    return Handlebars.compile("<button>{{text}}</button>")({ ...this.props });
  }
}
