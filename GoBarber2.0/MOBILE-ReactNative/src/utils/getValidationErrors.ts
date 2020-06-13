import { ValidationError } from 'yup';

interface Error {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Error {
  const errors: Error = {};

  err.inner.forEach((e) => {
    errors[e.path] = e.message;
  });

  return errors;
}
