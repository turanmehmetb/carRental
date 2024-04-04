// vehicle.model.ts
import {keyValueSetter} from 'libs/utils/src/keyValueSetter';

import {BaseModel} from '../base.model';

export class Vehicle extends BaseModel {
    make: string;
    model: string;
    year: number;
    status: string; // Available, rented, maintenance, etc.

    constructor(entity?: Vehicle) {
        super();
        if (entity) {
            keyValueSetter(this, entity);
        }
    }
}
