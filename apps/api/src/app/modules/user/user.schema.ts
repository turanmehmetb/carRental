import { User } from "@carRental/models";
import { Prop, Schema } from "@nestjs/mongoose";
import { BaseSchema } from "../base/base.schema";
const { nanoid } = require('nanoid');

@Schema( { versionKey: false } )
export class UserSchema extends BaseSchema implements User {
    @Prop({default: () => nanoid(10)})
    userId: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop()
    name: string;
    @Prop()
    surname: string;
    @Prop()
    phone: string;
    @Prop()
    db: number;
}