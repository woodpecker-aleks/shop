import { Fragment } from "react";

const if_methods = {
  ElseIf(condition) {
    return jsx => {
      if (condition && !this.body) {
        this.body = jsx();
      }
      return this;
    };
  },
  Else(jsx) {
    if (this.body) {
      return this.body;
    } else {
      return jsx();
    }
  },
  End() {
    return this.body;
  }
}

export function If(condition) {
  const jsxWrapper = Object.create(if_methods);

  return jsx => {

    if (condition) {
      jsxWrapper.body = jsx();
    } else {
      jsxWrapper.body = null;
    }

    return jsxWrapper;
  }
}

const switchOnce_methods = {
  Case(condition) {
    return jsx => {
      if (condition && !this.body) this.body = jsx();

      return this;
    }
  },
  Default(jsx) {
    if (!this.body) return jsx();
    else return this.body;
  },
  End() {
    return this.body;
  }
}

export function SwitchOnce() {
  const jsxWrapper = Object.create(switchOnce_methods);

  return jsxWrapper;
}

const switchMany_methods = {
  Case(condition) {
    return jsx => {
      if (condition) this.items.push(jsx());
      return this;
    }
  },
  Default(jsx) {
    if (jsx) this.items.push(jsx());

    return this.items.map((item, index) => (
      <Fragment key={index}>
        {item}
      </Fragment>
    ));
  },
  End() {
    return this.items.map((item, index) => (
      <Fragment key={index}>
        {item}
      </Fragment>
    ));
  }
}

export function SwitchMany() {
  const jsxWrapper = Object.create(switchMany_methods);

  jsxWrapper.items = [];

  return jsxWrapper;
}