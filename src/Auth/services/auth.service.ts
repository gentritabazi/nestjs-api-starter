import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../Users/services/user.service";
import { jwtContanst } from "../contants/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        `These credentials do not match our records.`
      );
    }

    if (await user.validatePassword(password)) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: jwtContanst.expiresIn
    };
  }
}