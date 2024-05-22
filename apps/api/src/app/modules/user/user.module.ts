import {WinstonModule} from 'nest-winston';

import {User} from '@carRental/models';
import {loggerConfig} from '@carRental/utils';
import {Module, OnModuleInit} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule, SchemaFactory} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';

import {AuthModule} from './authentication/jwt.module';
import {UserController} from './user.controller';
import {UserMockData} from './user.mock.data';
import {UserSchema} from './user.schema';
import {UserService} from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                collection: 'User',
                schema: SchemaFactory.createForClass(UserSchema),
            },
        ]),
        PassportModule,
        AuthModule,
        ConfigModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: User.name,
            useValue: WinstonModule.createLogger({
                transports: loggerConfig(User.name),
            }),
        },
    ],
    exports: [UserService],
})
export class UserModule implements OnModuleInit {
    constructor(private readonly userService: UserService) {}

    async onModuleInit() {
        await this.populateMockData();
    }

    async populateMockData() {
        try {
            const users = await this.userService.getAll();
            if (users.length === 0) {
                await this.userService.insertMany(UserMockData.defaultUsers);
                console.log('Default users inserted successfully.');
            }
        } catch (error) {
            console.error('Error inserting default users:', error);
        }
    }
}
