export const
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  DOLLAR = 'dollar',
  UAH = 'uah',
  RUB = 'rub',
  EU = 'euro',
  ZL = 'zl',
  emailValidator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  passwordValidator = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})/,
  wordValidator = /([A-Za-z0-9-]+)/,
  phoneValidator = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;