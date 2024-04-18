import {Model} from 'mongoose';

import {FuelType, Vehicle, VehicleType} from '@carRental/models'; // Ensure Vehicle is exported from your models
import {Inject, Injectable, LoggerService} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectModel} from '@nestjs/mongoose';

import {BaseService} from '../base/base.service';

const defaultVehicles = [
    {
        db: 1,
        brandName: 'Ford',
        modelName: 'Kuga',
        modelYear: 2024,
        transmissionType: 'auto',
        type: VehicleType.car,
        color: 'black',
        fuelType: FuelType.diesel,
        people: 5,
        imgPath: 'assets/images/rentimg.png',
    },
    {
        db: 1,
        brandName: 'Peugeot',
        modelName: '408',
        modelYear: 2024,
        transmissionType: 'auto',
        type: VehicleType.car,
        color: 'blue',
        fuelType: FuelType.petrol,
        people: 5,
        imgPath: 'assets/images/rentimg2.png',
    },
    {
        db: 1,
        brandName: 'BMW',
        modelName: 'X1',
        modelYear: 2024,
        transmissionType: 'auto',
        type: VehicleType.car,
        color: 'white',
        fuelType: FuelType.diesel,
        people: 5,
        imgPath: 'assets/images/rentimg3.png',
    },
] as Vehicle[];
@Injectable()
export class VehicleService extends BaseService<Vehicle> {
    constructor(
        @InjectModel(Vehicle.name)
        private readonly vehicleModel: Model<Vehicle>,
        protected readonly configService: ConfigService,
    ) {
        super(vehicleModel);
    }

    // Example of a Vehicle-specific method
    findByMakeAndModel(make: string, model: string): Promise<Vehicle[]> {
        return this.vehicleModel.find({make, model}).exec();
    }

    countWithFilter(baseQuery: unknown): Promise<number> {
        let query = {db: 1};

        query = this.getFilterQuery(baseQuery, query);

        return this.vehicleModel.count().where(query).exec();
    }

    getFilterQuery(baseQuery: any, query: {db: number}) {
        if (baseQuery.make) {
            query['make'] = {$regex: baseQuery.make, $options: 'i'};
        }
        if (baseQuery.model) {
            query['model'] = {$regex: baseQuery.model, $options: 'i'};
        }
        if (baseQuery.year) {
            query['year'] = baseQuery.year;
        }
        if (baseQuery.status) {
            query['status'] = {$regex: baseQuery.status, $options: 'i'};
        }

        return query;
    }
}
