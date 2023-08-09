export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      username: this._userNameElement.textContent,
      userJobDescription: this._userJobElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = about;
    
  }

  setAvatarInfo(avatar) {
    this._userAvatarElement.src = avatar;
   
  }
}
