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
  const errors = {};
  let title = '';
  if (!payload.email || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }
  if (!payload.password || !validator.isLength(payload.password, 8)) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }
  if (!payload.name || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }
  if (!isFormValid) {
    title = 'Check the form for errors.';
  }
  return {
    success: isFormValid,
    title,
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
  const errors = {};
  let title = '';
  if (!payload.email || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }
  if (!payload.password || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }
  if (!isFormValid) {
    title = 'Check the form for errors.';
  }
  return {
    success: isFormValid,
    title,
    errors,
  };
}

module.exports = {
  SignUpForm,
  LoginForm,
};
