class Auth {
  constructor() {
    this.user_token = (localStorage.getItem('auth') !== 'undefined') ? JSON.parse(localStorage.getItem('auth')) : {}
  }
  getToken() {
    return this.user_token.token
  }
  getUserId() {
    return this.user_token.userId
  }
  setUserToken(new_token) {
    this.user_token = new_token
    localStorage.setItem('auth', JSON.stringify(new_token))
  }
  logout() {
    localStorage.removeItem('auth')
  }
}
export default new Auth()