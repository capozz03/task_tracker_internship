import UniversalCookie from 'universal-cookie';

class Cookies extends UniversalCookie {
  setToken = (token: string) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    this.set('mainToken', token, { path: '/', expires });
  };

  deleteToken = () => {
    this.remove('mainToken');
  };

  getToken = () => this.get('mainToken');

  setUserId = (id: string) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    this.set('userId', id, { path: '/', expires });
  };

  deleteUserId = () => {
    this.remove('userId');
  };

  getUserId = () => this.get('userId');
}

export const clientCookies = new Cookies();
