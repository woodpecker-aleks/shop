import { DOLLAR, EU, UAH, RUB, ZL, GET, POST, DELETE, PUT } from './constants';

export function calcAverageNumOfArray(array) {
  const sumOfArrayNums = array.reduce((accum, curr) => (accum + curr), 0);

  return (sumOfArrayNums / array.length);
}

export function transferCurrency(money, currency) {
  if (currency === DOLLAR) return `$ ${money}`;

  if (currency === ZL) return `${ (money * 3.74).toFixed(0) } zł`;

  if (currency === UAH) return `${ (money * 28.34).toFixed(0) } грн.`;

  if (currency === RUB) return `${ (money * 74.54).toFixed(0) } руб.`;

  if (currency === EU) return `€ ${ (money * 0.81).toFixed(0) }`;
}

export const Http = {
  async get(url, config = {}) {
    try {
      const { auth = true, resData = 'json' } = config;
      const fetchConfig = {
        method: GET,
        headers: {}
      };

      if (auth) {
        const user = JSON.parse(localStorage.getItem('userData'));

        if (user?.token) fetchConfig.headers['Authorization'] = `Bearer ${user.token}`;
      }

      const res = await fetch(url, fetchConfig);

      if (resData === 'json') return await res.json();

      else if (resData === 'str') return await res.text();

      else if (resData === 'status') return res.status;

      else if (resData === 'ok') return res.ok;

      else if (resData === 'none') return null;

    } catch (err) {
      throw new Error(err.message);
    }
  },

  async post(url, data, config = {}) {
    try {
      const { auth = true, reqData = 'json', resData = 'json' } = config;
      const fetchConfig = {
        method: POST,
        headers: {}
      };

      if (reqData === 'json') {
        fetchConfig.body = JSON.stringify(data);
        fetchConfig.headers['Content-type'] = 'application/json';
      } else if (reqData === 'form') fetchConfig.body = data;

      if (auth) {
        const user = JSON.parse(localStorage.getItem('userData'));

        if (user?.token) fetchConfig.headers['Authorization'] = `Bearer ${user.token}`;
      }

      const res = await fetch(url, fetchConfig);

      if (resData === 'json') return await res.json();

      else if (resData === 'str') return await res.text();

      else if (resData === 'status') return res.status;

      else if (resData === 'ok') return res.ok;

      else if (resData === 'none') return null;
      
    } catch (err) {
      return err;
    }
  },

  async delete(url, config = {}) {
    try {
      const { auth = true, resData = 'json' } = config;
      const fetchConfig = {
        method: DELETE,
        headers: {}
      };

      if (auth) {
        const user = JSON.parse(localStorage.getItem('userData'));

        if (user?.token) fetchConfig.headers['Authorization'] = `Bearer ${user.token}`;
      }

      const res = await fetch(url, fetchConfig);

      if (resData === 'json') return await res.json();

      else if (resData === 'str') return await res.text();

      else if (resData === 'status') return res.status;

      else if (resData === 'ok') return res.ok;

      else if (resData === 'none') return null;

    } catch (err) {
      return err;
    }
  },

  async put(url, data, config = {}) {
    try {
      const { auth = true, reqData = 'json', resData = 'json' } = config;
      const fetchConfig = {
        method: PUT,
        headers: {}
      };

      if (reqData === 'json') {
        fetchConfig.body = JSON.stringify(data);
        fetchConfig.headers['Content-type'] = 'application/json';
      } else if (reqData === 'form') fetchConfig.body = data;

      if (auth) {
        const user = JSON.parse(localStorage.getItem('userData'));

        if (user?.token) fetchConfig.headers['Authorization'] = `Bearer ${user.token}`;
      }

      const res = await fetch(url, fetchConfig);

      if (resData === 'json') return await res.json();

      else if (resData === 'str') return await res.text();

      else if (resData === 'status') return res.status;

      else if (resData === 'ok') return res.ok;

      else if (resData === 'none') return null;
      
    } catch (err) {
      return err;
    }
  },
}

export function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};