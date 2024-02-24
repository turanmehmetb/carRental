import { User } from "@carRental/models";
import { Prop, Schema } from "@nestjs/mongoose";
import { BaseSchema } from "../base/base.schema";
@Schema( { versionKey: false } )
export class UserSchema extends BaseSchema implements User {
    @Prop()
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