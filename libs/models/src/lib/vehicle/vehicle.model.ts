
import { keyValueSetter } from 'libs/utils/src/keyValueSetter';
import { BaseModel } from '../base.model';

export class Vehicle extends BaseModel {
    type: VehicleType;
    fuelType: FuelType;
    transmissionType: 'manual' | 'auto';
    color: string;
    brandName: string;
    modelName: string;
    modelYear: number;
    people: number;
    imgPath: string;

    constructor(entity?: Vehicle) {
        super();
        if (entity) keyValueSetter(this, entity);
    }
}

export enum VehicleType {
    car = 'car',
    motorcycle = 'motorcycle'
}

export enum FuelType {
    diesel = 'diesel',
    petrol = 'petrol',
    gasoline = 'gasoline',
    hybrid = 'hybrid',
    electricity = 'electricity'
}