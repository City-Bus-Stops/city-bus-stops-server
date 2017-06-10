const validate = require('validate.js');
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation.
 * Object contains a boolean validation result,
 * errors tips, and a global message for a whole form.
 */
function SignUpForm(payload) {
  return validate(payload, {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
      length: {
        minimum: 8,
        message: 'must be at least 8 characters',
      }
    },
    username: {
      presence: true,
      length: {
        minimum: 5,
        message: 'must be at least 5 characters',
      }
    }
  });
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
  return validate(payload, {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
      length: {
        minimum: 8,
        message: 'must be at least 8 characters',
      }
    },
  });
}

function registrationForm(payload) {
  return validate(payload, {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
      length: {
        minimum: 8,
        message: 'must be at least 8 characters',
      }
    },
    username: {
      presence: true,
      length: {
        minimum: 5,
        message: 'must be at least 5 characters',
      }
    },
    userRole: {
      presence: true,
      length: {
        minimum: 4,
        message: 'must be at least 4 characters',
      }
    }
  });
}

module.exports = {
  SignUpForm,
  LoginForm,
  registrationForm,
};
