export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      username: this._userNameElement.textContent,
      userJobDescription: this._userJobElement.textContent
    };
  }

  setUserInfo({ name, about }) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = about;
  }
}
