/**
 * Modified version of the getPropTypes function from facebook/prop-types
 * that throws an error instead of printing a warning, and does so in every
 * environment.
 */

'use strict';

const ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
const has = Function.call.bind(Object.prototype.hasOwnProperty);

function printWarning(text) {
  const message = 'Warning: ' + text;
  if (typeof console !== 'undefined') {
    console.error(message);
  }
};

/**
 * Assert that the values match with the type specs.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} name Name of the map for error messages.
 */
function checkPropTypes(typeSpecs, values, name) {
  for (const typeSpecName in typeSpecs) {
    if (has(typeSpecs, typeSpecName)) {
      let error;
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        if (typeof typeSpecs[typeSpecName] !== 'function') {
          const err = Error(
            name + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
            'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
            'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
          );
          err.name = 'Invariant Violation';
          throw err;
        }
        error = typeSpecs[typeSpecName](values, typeSpecName, name, 'property', null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      if (error) {
        if (!(error instanceof Error)) {
          printWarning(
            name + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        throw error;
      }
    }
  }
}

module.exports = checkPropTypes;
