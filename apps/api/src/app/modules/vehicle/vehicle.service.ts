import {Model} from 'mongoose';

import {FuelType, Vehicle, VehicleType} from '@carRental/models';
import {Inject, Injectable, LoggerService} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectModel} from '@nestjs/mongoose';

import {BaseService} from '../base/base.service';
import {VehicleMockData} from './vehicle.mock.data';

@Injectable()
export class VehicleService extends BaseService<Vehicle> {
    constructor(
        @InjectModel('Vehicle')
        private readonly vehicleModel: Model<Vehicle>,
        protected readonly configService: ConfigService,
    ) {
        super(vehicleModel);
    }

    async findAvailableVehiclesByDateRange(
        startTimestamp: number,
        endTimestamp: number,
    ): Promise<Vehicle[]> {
        return this.vehicleModel.aggregate([
            {
                $lookup: {
                    from: 'Reservations',
                    let: { 'id': '$vehicleId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$$id', '$vehicle.vehicleId'] },
                                        { $gte: ['$startDate', startTimestamp] },
                                        { $lte: ['$startDate', endTimestamp] },
                                        { $gte: ['$endDate', startTimestamp] },
                                        { $lte: ['$endDate', endTimestamp] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'reservations'
                }
            },
            {
                $match: {
                    'reservations': { $size: 0 }
                }
            }
        ]).exec();
    }

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
