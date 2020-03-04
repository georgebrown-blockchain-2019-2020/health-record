export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};
export const checkValidity = (value, rules) => {
  let error = [];
  if (rules.required) {
    if (value.trim() === "") {
      error.push("Empty Field");
    }
  }
  if (rules.minLength) {
    if (value.length <= rules.minLength) {
      error.push("Not enough Length");
    }
  }
  if (rules.email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value)) {
      error.push("Invalid Email");
    }
  }
  return error;
};
