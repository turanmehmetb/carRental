import { User } from "@carRental/models";
import { Body, Controller, Post } from "@nestjs/common";
import { BaseController } from "../base/base.controller";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController extends BaseController<User> {
    constructor(
        private readonly userService: UserService
    ) {
        super(userService);
    }

    @Post('/findWithFilter')
    findWithFilter(@Body() baseQuery: any): Promise<User[]> {
        return this.userService.findWithFilter(baseQuery);
    }

    @Post('/countWithFilter')
    countWithFilter(@Body() baseQuery: any): Promise<number> {
        return this.userService.countWithFilter(baseQuery);
    }
}