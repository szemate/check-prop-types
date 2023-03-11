# check-prop-types

An actually useful version of `PropTypes.checkPropTypes()` for using
[prop-types] without React.

[prop-types] would be very usable as a generic spec library, but its usefulness
is limited as `PropTypes.checkPropTypes()` only prints warnings and only does so
in non-production environments.

[checkPropTypes.js](./checkPropTypes.js) provides a modified `checkPropTypes()`
function that throws exceptions in every environment.

[prop-types]: https://github.com/facebook/prop-types

## Usage Example

```js
const PropTypes = require('prop-types');
const checkPropTypes = require('./checkPropTypes');

const personSpec = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birthDate: PropTypes.number.isRequired,
};

const person = {
  firstName: 'Joe',
  lastName: 'Smith',
}

// This prints a warning
PropTypes.checkPropTypes(personSpec, person, 'prop', 'personSpec');

// This throws an error
checkPropTypes(personSpec, person, 'personSpec');
```
