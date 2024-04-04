import {Vehicle} from '@carRental/models';
// vehicle.schema.ts
import {Prop, Schema} from '@nestjs/mongoose';

import {BaseSchema} from '../base/base.schema';

@Schema({versionKey: false})
export class VehicleSchema extends BaseSchema implements Vehicle {
    @Prop()
    make: string;

    @Prop()
    model: string;

    @Prop()
    year: number;

    @Prop({default: 'available'}) // Available, rented, maintenance, etc.
    status: string;
}
