const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "minLength":
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case "isNum":
        isValid = isValid && numberValidator(val);
        break;
      case "notEmpty":
        isValid = isValid && notEmptyValidator(val);
        break;
      default:
        isValid = true;
    }
  }

  return isValid;
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const numberValidator = (val, isNum) => {
  return !isNaN(val);
}
const notEmptyValidator = val => {
  return val.trim() !== "";
};

export default validate;
