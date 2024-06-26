export const errorHandler = {
  user: {
    stringBase: (value) => `${value} should be a type of 'text'`,
    stringEmpty: (value) => `${value} cannot be an empty field`,
    stringMin: `Username should have a minimum length of {#limit}`,
    anyRequired: (value) => `${value} is a required field`,
    isPassword: `Password must be a combination of letters and numbers`,
    isEmail: `Email must be a valid email`,
    numberBase: (value) => `${value} should be a type of 'number'`,
    isPassword: "Password is incorrect!",
  },
};
