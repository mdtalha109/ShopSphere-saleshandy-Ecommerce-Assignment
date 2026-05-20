import { User, LoginCredentials, VALID_CREDENTIALS, GUEST_USER } from '../types';
import { InvalidCredentialsError } from '../domain';
import { AuthRepository } from '../repositories';

export class AuthService {
  constructor(private repository: AuthRepository) {}

  private validateCredentials(credentials: LoginCredentials): boolean {
    return (
      credentials.email === VALID_CREDENTIALS.email &&
      credentials.password === VALID_CREDENTIALS.password
    );
  }

  async login(credentials: LoginCredentials): Promise<User> {
    // TODO: replace with real api
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!this.validateCredentials(credentials)) {
      throw new InvalidCredentialsError();
    }

    const user: User = {
      email: credentials.email,
      name: 'Frontend Developer',
      isGuest: false,
    };

    this.repository.saveUser(user);
    return user;
  }

  async loginAsGuest(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    this.repository.saveUser(GUEST_USER);
    return GUEST_USER;
  }

  logout(): void {
    this.repository.removeUser();
  }

  getCurrentUser(): User | null {
    return this.repository.getUser();
  }

  isAuthenticated(): boolean {
    return this.repository.isAuthenticated();
  }
}
