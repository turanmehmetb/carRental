import { User } from '@carRental/models';
import { loggerConfig } from '@carRental/utils';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { WinstonModule } from 'nest-winston';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
@Module({
    imports: [
      MongooseModule.forFeature([ { name: User.name, collection: 'User', schema: SchemaFactory.createForClass(UserSchema) } ]),
      PassportModule,
      ConfigModule
    ],
    controllers: [UserController],
    providers: [
      UserService,
      {
        provide: User.name,
        useValue: WinstonModule.createLogger({transports: loggerConfig(User.name)})
      }
    ],
    exports: [UserService]
})
export class UserModule {}
