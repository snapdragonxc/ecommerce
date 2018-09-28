class Verify {
  static isNumber(input) {
    const validate = typeof input === 'number' && !Number.isNaN(input);
    if (input === true || input === false) {
      return false;
    }
    return validate;
  }

  static isEmpty(input) {
    if (typeof (input) === 'string') {
      return input.trim().length > 0;
    }
    return (input !== null && input !== undefined);
  }

  static isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static isEmptyObject(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true;
    }
    return false;
  }
}

export default Verify;
