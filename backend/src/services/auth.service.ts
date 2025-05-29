import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signup(username: string, email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) throw new UnauthorizedException('Email déjà utilisé');
    if (password.length < 6) throw new UnauthorizedException('Le mot de passe doit contenir au moins 6 caractères');
    if (username.length < 3) throw new UnauthorizedException('Le nom d\'utilisateur doit contenir au moins 3 caractères');

    const hashedPassword = await this.hashPassword(password);

    const user = await this.userService.create({
      username,
      email,
      password: hashedPassword,
      color: this.generateRandomColor()
    });

    const token = this.generateToken(user);

    return {
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        color: user.color
      }
    };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email ou mot de passe invalide');

    const isPasswordValid = await this.validatePassword(
        password,
        user.password
      );

    if (!isPasswordValid) throw new UnauthorizedException('Email ou mot de passe invalide');

    const token = this.generateToken(user);

      return {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          color: user.color
        }
      };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  private async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateToken(user: any): string {
    return this.jwtService.sign({
      userId: user.id,
      email: user.email
    });
  }

  private generateRandomColor(): string {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  }
}
