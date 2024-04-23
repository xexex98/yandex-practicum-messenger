import {
  ProfileAvatar,
  ProfileControls,
  ProfileEditInfo,
  ProfileEditPassword,
  ProfileInfo,
} from "src/pages/page-profile/components";
import ProfileAvatarModal from "src/pages/page-profile/components/avatar-modal";
import { GoBackArrowButton } from "src/partials";
import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class PageProfile extends Block {
  init() {
    const Back = new GoBackArrowButton();

    const Avatar = new ProfileAvatar({
      events: {
        click: () => AvatarModal.show("flex"),
      },
    });

    const AvatarModal = new ProfileAvatarModal({});

    const Info = new ProfileInfo();

    const Controls = new ProfileControls({
      onEditInfo: () => {
        Info.hide();
        EditInfo.show();
      },
      onEditPassword: () => {
        Info.hide();
        EditPassword.show();
      },
    });

    const EditInfo = new ProfileEditInfo({
      onSaveEdit: () => {
        Controls.show();
        Info.show();
      },
    });

    const EditPassword = new ProfileEditPassword({
      onSaveEdit: () => {
        Controls.show();
        Info.show();
      },
    });

    EditInfo.hide();
    EditPassword.hide();
    AvatarModal.hide();

    this.children = {
      ...this.children,
      Back,
      Avatar,
      AvatarModal,
      Info,
      EditInfo,
      EditPassword,
      Controls,
    };
  }

  render(): string {
    return `
    <main class="${css.profile}">
      {{{ AvatarModal }}}
      {{{ Back }}}
      <div class="${css.info}">
        <div class="${css.content}">
          {{{ Avatar }}}
          <h3 class="${css.name}">Андрей</h3>
          {{{ Info }}}
          {{{ EditInfo }}}
          {{{ EditPassword }}}
        </div>
        {{{ Controls }}}
      </div>
      </main>
    `;
  }
}
