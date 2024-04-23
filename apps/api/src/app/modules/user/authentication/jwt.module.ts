import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
      JwtModule.register({
        secret: 'secret12356789',
        signOptions: { expiresIn: '7d' },
      }),
    ],
    providers: [JwtStrategy],
    exports: [JwtModule],
  })
  export class AuthModule {}