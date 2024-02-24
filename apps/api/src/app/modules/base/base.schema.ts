import { BaseModel } from "@carRental/models";
import { Prop, Schema } from '@nestjs/mongoose';

@Schema( { versionKey: false })
export class BaseSchema implements BaseModel{
    _id: string;
    @Prop()
    db: number;
}