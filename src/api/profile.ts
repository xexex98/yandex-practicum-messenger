import HTTP from "src/core/XMLHttpRequest";

const user = new HTTP("user");

export type TUpdateProfile = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TUpdateProfilePassword = {
  oldPassword: string;
  newPassword: string;
};

class ProfileApi {
  public async updateProfile(data: TUpdateProfile) {
    return user.put("/profile", { data });
  }
  public async updateProfileAvatar(data: { formData: FormData }) {
    return user.put("/profile/avatar", { data });
  }
  public async updateProfilePassword(data: TUpdateProfilePassword) {
    return user.put("/password", { data });
  }
}

export default new ProfileApi();
