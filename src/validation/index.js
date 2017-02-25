const validator = require('validator');
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation.
 * Object contains a boolean validation result,
 * errors tips, and a global message for a whole form.
 */
function SignUpForm(payload) {
  let isFormValid = true;
  const errors = [];
  if (!payload.email || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.push('Please provide a correct email address.');
  }
  if (!payload.password || !validator.isLength(payload.password, 8)) {
    isFormValid = false;
    errors.push('Password must have at least 8 characters.');
  }
  if (!payload.name || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.push('Please provide your name.');
  }
  return {
    success: isFormValid,
    errors,
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation.
 * Object contains a boolean validation result,
 * errors tips, and a global message for the whole form.
 */
function LoginForm(payload) {
  let isFormValid = true;
  const errors = [];
  if (!payload.email || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.push('Please provide your email address.');
  }
  if (!payload.password || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.push('Please provide your password.');
  }
  return {
    success: isFormValid,
    errors,
  };
}

module.exports = {
  SignUpForm,
  LoginForm,
};
