import {Model} from 'mongoose';

// vehicle.service.ts
import {Vehicle} from '@carRental/models'; // Ensure Vehicle is exported from your models
import {Inject, Injectable, LoggerService} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectModel} from '@nestjs/mongoose';

import {BaseService} from '../base/base.service';

@Injectable()
export class VehicleService extends BaseService<Vehicle> {
    constructor(
        @InjectModel(Vehicle.name)
        private readonly vehicleModel: Model<Vehicle>,
        // Assuming you might use logger and config services similar to UserService
        @Inject(Vehicle.name) protected readonly logger: LoggerService,
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
            // Assuming year is an exact match rather than a regex search
            query['year'] = baseQuery.year;
        }
        if (baseQuery.status) {
            query['status'] = {$regex: baseQuery.status, $options: 'i'};
        }

        return query;
    }
}
