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
}

export const clientCookies = new Cookies();
