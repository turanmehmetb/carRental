import {User} from '@carRental/models';
import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {BaseController} from '../base/base.controller';
import {UserService} from './user.service';

@Controller('/user')
export class UserController extends BaseController<User> {
    constructor(private readonly userService: UserService) {
        super(userService);
    }

    @Post('/login')
    login(@Body() credentials: User): Promise<{ accessToken: string, userId: string; }> {
        return this.userService.login(credentials);
    }

    @Post('/register')
    register(@Body() credentials: User): Promise<User> {
        return this.userService.register(credentials);
    }

    @Get('/changePassword')
    changePassword(@Query('email') email: string, @Query('password') password: string): Promise<User> {
        return this.userService.changePassword(email, password);
    }

    @Post('/findWithFilter')
    findWithFilter(@Body() baseQuery: any): Promise<User[]> {
        return this.userService.findWithFilter(baseQuery);
    }

    @Post('/countWithFilter')
    countWithFilter(@Body() baseQuery: any): Promise<number> {
        return this.userService.countWithFilter(baseQuery);
    }
    
    @Get('/getUserByEmail')
    getUserByEmail(@Query('email') email: string): Promise<User> {
        return this.userService.getUserByEmail(email);
    }

    @Get('/getUserByUserId')
    getUserByUserId(@Query('userId') userId: string): Promise<User> {
        return this.userService.getUserByUserId(userId);
    }
}
