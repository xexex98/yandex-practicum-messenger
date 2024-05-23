import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import {
  GoPrevPage,
  ProfileAvatar,
  ProfileControls,
  ProfileEditInfo,
  ProfileEditPassword,
  ProfileInfo,
} from "src/pages/page-profile/components";
import ProfileAvatarModal from "src/pages/page-profile/components/avatar-modal";
import controller from "src/pages/page-profile/controller";
import { ApiError, Loader } from "src/partials";

import css from "./style.module.css";

class PageProfile extends Block {
  public async init() {
    await controller.user();
  }

  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      info: true,
      editInfo: false,
      editPassword: false,
      Back: new GoPrevPage(),
      Avatar: new ProfileAvatar({
        events: {
          click: () => this.children.AvatarModal.setProps({ show: true }),
        },
      }),

      AvatarModal: new ProfileAvatarModal({
        onClose: () => this.children.AvatarModal.setProps({ show: false }),
      }),

      Info: new ProfileInfo(),

      Controls: new ProfileControls({
        onEditInfo: () => {
          this.setProps({ editInfo: true, editPassword: false, info: false });
        },
        onEditPassword: () => {
          this.setProps({ editPassword: true, editInfo: false, info: false });
        },
      }),

      EditInfo: new ProfileEditInfo({
        onSaveEdit: () => {
          this.setProps({ editInfo: false, editPassword: false, info: true });
        },
      }),

      EditPassword: new ProfileEditPassword({
        onSaveEdit: () => {
          this.setProps({ editInfo: false, editPassword: false, info: true });
        },
      }),

      Load: new Loader({ loading: true }),

      Error: new ApiError(),
    });
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    this.children.Load.setProps({ loading: store.getState().load });

    if (
      typeof store.getState().user === "object" &&
      store.getState().user !== null &&
      typeof (store.getState().user as { first_name?: string }).first_name === "string"
    ) {
      this.setProps({ name: (store.getState().user as { first_name: string }).first_name });
    }

    return true;
  }

  render(): string {
    return `
      <main class="${css.profile}">
        {{{ Load }}}
        {{{ AvatarModal }}}
        {{{ Back }}}
        <div class="${css.info}">
          <div class="${css.content}">
            {{{ Avatar }}}
            <h3 class="${css.name}">{{ name }}</h3>
            {{#if info}}
              {{{ Info }}}
            {{/if}}
            {{#if editInfo}}
              {{{ EditInfo }}}
            {{/if}}
            {{#if editPassword}}
              {{{ EditPassword }}}
            {{/if}}
            {{#if isUserError}}
              {{{ Error }}}
            {{/if}}
          </div>
          {{#if info}}
            {{{ Controls }}}
          {{/if}}
        </div>
      </main>
    `;
  }
}

export default connect(({ user, load, isUserError }) => ({
  user,
  load,
  isUserError,
}))(PageProfile);
