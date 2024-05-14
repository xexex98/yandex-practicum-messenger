import Block from "src/core/block";
import connect from "src/core/connect";
import {
  GoPrevPage,
  ProfileAvatar,
  ProfileControls,
  ProfileEditInfo,
  ProfileEditPassword,
  ProfileInfo,
} from "src/pages/page-profile/components";
import ProfileAvatarModal from "src/pages/page-profile/components/avatar-modal";

import css from "./style.module.css";

class PageProfile extends Block {
  init() {
    const Back = new GoPrevPage();

    const Avatar = new ProfileAvatar({
      events: {
        click: () => AvatarModal.setProps({ show: true }),
      },
    });

    const AvatarModal = new ProfileAvatarModal({ title: "Загрузить файл" });

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

  constructor(props: Record<string, unknown>) {
    super({ ...props, info: true, editInfo: false, editPassword: false });
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
            {{#if info}}
              {{{ Info }}}
            {{/if}}
            {{#if editInfo}}
              {{{ EditInfo }}}
            {{/if}}
            {{#if editPassword}}
              {{{ EditPassword }}}
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

export default connect((state) => state)(PageProfile);
