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
  onClose() {
    this.children.AvatarModal.setProps({ show: false });
  }

  public init() {
    const onCloseBind = this.onClose.bind(this);
    const Back = new GoPrevPage();

    const Avatar = new ProfileAvatar({
      events: {
        click: () => AvatarModal.setProps({ show: true }),
      },
    });

    const AvatarModal = new ProfileAvatarModal({ onClose: onCloseBind });

    const Info = new ProfileInfo();

    const Controls = new ProfileControls({
      onEditInfo: () => {
        this.setProps({ editInfo: true, editPassword: false, info: false });
      },
      onEditPassword: () => {
        this.setProps({ editPassword: true, editInfo: false, info: false });
      },
    });

    const EditInfo = new ProfileEditInfo({
      onSaveEdit: () => {
        this.setProps({ editInfo: false, editPassword: false, info: true });
      },
    });

    const EditPassword = new ProfileEditPassword({
      onSaveEdit: () => {
        this.setProps({ editInfo: false, editPassword: false, info: true });
      },
    });

    const Load = new Loader({ loading: true });

    const Error = new ApiError();

    this.children = {
      ...this.children,
      Back,
      Avatar,
      AvatarModal,
      Info,
      EditInfo,
      EditPassword,
      Controls,
      Load,
      Error,
    };

    controller.user();
  }

  constructor(props: Record<string, unknown>) {
    super({ ...props, info: true, editInfo: false, editPassword: false });
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

export default connect(({ user, load, isUserError }) => ({ user, load, isUserError }))(PageProfile);
