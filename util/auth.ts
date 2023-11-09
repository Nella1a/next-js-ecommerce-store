import Tokens from 'csrf';

const tokens = new Tokens();

export function createCsrfToken() {
  if (typeof process.env.CSRF_SECRET_SALT === 'undefined') {
    throw new Error('CSRF_SECRET_SALT is not defined');
  }
  return tokens.create(process.env.CSRF_SECRET_SALT);
}

/** Verify that CSRF Token was generated by the CSRF_SECRET_SALT environment variable */
export function verifyCsrfToken(csrfToken: string) {
  if (typeof process.env.CSRF_SECRET_SALT === 'undefined') {
    throw new Error('CSRF_SECRET_SALT is not defined');
  }

  return tokens.verify(process.env.CSRF_SECRET_SALT, csrfToken);
}
