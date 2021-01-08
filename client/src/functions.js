import { EU, UAH, RUB, ZL, GET, POST, DELETE, PUT } from './constants';

export function calcAverageNumOfArray(array) {
  const sumOfArrayNums = array.reduce((accum, curr) => (accum + curr), 0);

  return (sumOfArrayNums / array.length);
}

export function transferCurrency(money, currency) {
  switch (currency) {
    case ZL: return `${ (money * 3.74).toFixed(0) } zł`;
    case UAH: return `${ (money * 28.34).toFixed(0) } грн.`;
    case RUB: return `${ (money * 74.54).toFixed(0) } руб.`;
    case EU: return `€ ${ (money * 0.81).toFixed(0) }`;
    default: return `$ ${money}`;
  }
}

export const Http = {
  translateStatus(status) {
    switch (status) {
      case 100: return 'Continue';
      case 101: return 'Switching Protocols';
      case 102: return 'Processing';

      case 200: return 'OK';
      case 201: return 'Created';
      case 202: return 'Accepted';
      case 203: return 'Non-authoritative Information';
      case 204: return 'No Content';
      case 205: return 'Reset Content';
      case 206: return 'Partial Content';
      case 207: return 'Multi-Status';
      case 208: return 'Already Reported';
      case 226: return 'IM Used';

      case 300: return 'Multiple Choices';
      case 301: return 'Moved Permanently';
      case 302: return 'Found';
      case 303: return 'See Other';
      case 304: return 'Not Modified';
      case 305: return 'Use Proxy';
      case 307: return 'Temporary Redirect';
      case 308: return 'Permanent Redirect';

      case 400: return 'Bad Request';
      case 401: return 'Unauthorized';
      case 402: return 'Payment Required';
      case 403: return 'Forbidden';
      case 404: return 'Not Found';
      case 405: return 'Method Not Allowed';
      case 406: return 'Not Acceptable';
      case 407: return 'Proxy Authentication Required';
      case 408: return 'Request Timeout';
      case 409: return 'Conflict';
      case 410: return 'Gone';
      case 411: return 'Length Required';
      case 412: return 'Precondition Failed';
      case 413: return 'Payload Too Large';
      case 414: return 'Request-URI Too Long';
      case 415: return 'Unsupported Media Type';
      case 416: return 'Requested Range Not Satisfiable';
      case 417: return 'Expectation Failed';
      case 418: return 'I\'m a teapot';
      case 421: return 'Misdirected Request';
      case 422: return 'Unprocessable Entity';
      case 423: return 'Locked';
      case 424: return 'Failed Dependency';
      case 426: return 'Upgrade Required';
      case 428: return 'Precondition Required';
      case 429: return 'Too Many Requests';
      case 431: return 'Request Header Fields Too Large';
      case 444: return 'Connection Closed Without Response';
      case 451: return 'Unavailable For Legal Reasons';
      case 499: return 'Client Closed Request';

      case 500: return 'Internal Server Error';
      case 501: return 'Not Implemented';
      case 502: return 'Bad Gateway';
      case 503: return 'Service Unavailable';
      case 504: return 'Gateway Timeout';
      case 505: return 'HTTP Version Not Supported';
      case 506: return 'Variant Also Negotiates';
      case 507: return 'Insufficient Storage';
      case 508: return 'Loop Detected';
      case 510: return 'Not Extended';
      case 511: return 'Network Authentication Required';
      case 599: return 'Network Connect Timeout Error';

      default: return 'Uncorected status';
    }
  },

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

      else if (resData === 'res') return res;

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

      else if (resData === 'res') return res;
      
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

      else if (resData === 'res') return res;

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

      else if (resData === 'res') return res;
      
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

export function setRecursiveTimeout(func, interval) {
  func();
  return setTimeout(function tick() {
    func();
    return setTimeout(tick, interval);
  }, interval);
}