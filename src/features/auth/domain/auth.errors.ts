
export class AuthenticationError extends Error {
  constructor(
    message: string,
    public code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'UNKNOWN_ERROR'
  ) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class InvalidCredentialsError extends AuthenticationError {
  constructor(message: string = 'Invalid email or password') {
    super(message, 'INVALID_CREDENTIALS');
    this.name = 'InvalidCredentialsError';
  }
}
