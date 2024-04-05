import {FuelType, Vehicle, VehicleType} from '@carRental/models';
// vehicle.schema.ts
import {Prop, Schema} from '@nestjs/mongoose';

import {BaseSchema} from '../base/base.schema';

@Schema({versionKey: false})
export class VehicleSchema extends BaseSchema implements Vehicle {
    @Prop({ type: String, enum: VehicleType })
    type: VehicleType;
    @Prop({ type: String, enum: FuelType })
    fuelType: FuelType;
    @Prop()
    transmissionType: 'manual' | 'auto';
    @Prop()
    color: string;
    @Prop()
    brandName: string;
    @Prop()
    modelName: string;
    @Prop()
    modelYear: number;
    @Prop()
    people: number;
    @Prop()
    imgPath: string;

}
