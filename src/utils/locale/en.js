/* eslint-disable object-curly-newline */
/* eslint-disable no-template-curly-in-string */

const mixed = {
  default: '${path} is invalid',
  required: '${path} is a required field',
  defined: '${path} must be defined',
  notNull: '${path} cannot be null',
  oneOf: '${path} must be one of the following values: ${values}',
  notOneOf: '${path} must not be one of the following values: ${values}',
  notType: '${path} must be a valid ${type} type and cannot be null',
};

const string = {
  length: '${path} must be exactly ${length} characters',
  min: '${path} must be at least ${min} characters',
  max: '${path} must be at most ${max} characters',
  matches: '${path} must match the following: "${regex}"',
  email: '${path} must be a valid email',
  url: '${path} must be a valid URL',
  uuid: '${path} must be a valid UUID',
  trim: '${path} must be a trimmed string',
  lowercase: '${path} must be a lowercase string',
  uppercase: '${path} must be a upper case string',
};

const number = {
  min: '${path} must be greater than or equal to ${min}',
  max: '${path} must be less than or equal to ${max}',
  lessThan: '${path} must be less than ${less}',
  moreThan: '${path} must be greater than ${more}',
  positive: '${path} must be a positive number',
  negative: '${path} must be a negative number',
  integer: '${path} must be an integer',
};

const date = {
  min: '${path} field must be later than ${min}',
  max: '${path} field must be at earlier than ${max}',
};

const boolean = {
  isValue: '${path} field must be ${value}',
};

const object = {
  noUnknown: '${path} field has unspecified keys: ${unknown}',
};

const array = {
  min: '${path} field must have at least ${min} items',
  max: '${path} field must have less than or equal to ${max} items',
  length: '${path} must have ${length} items',
};

export {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};
