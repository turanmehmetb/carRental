import { User } from '@carRental/models'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret12356789',
    })
  }

  async validate(payload: { user: User, login_date: number, status: number, iat: number, exp: number }) {
    return { email: payload.user.email }
  }
}

