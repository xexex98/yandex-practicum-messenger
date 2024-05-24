import Block from "src/core/block";
import store from "src/core/store";
import ProfileEditInfoField from "src/pages/page-profile/components/edit-info-field";

export default function fillInputs(children: Record<string, Block>) {
  const userState = (store.getState().user as Record<string, unknown>) || {};

  Object.values(children).forEach((child) => {
    if (!(child instanceof ProfileEditInfoField)) {
      return;
    }

    const { name } = child.props;

    if (typeof name === "string") {
      const value = (userState[name] as string) || "";

      child.setProps({ value });
      child.children.Input.setProps({ value });
    }
  });
}
