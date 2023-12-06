import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'Botrista_Exam_20231208', // Change this to a secure key
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      _id: payload._id,
      account: payload.account,
      roleType: payload.roleType
    };
  }
}
