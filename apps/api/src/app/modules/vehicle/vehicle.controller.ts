import {Vehicle} from '@carRental/models';
import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';

import {BaseController} from '../base/base.controller';
import {VehicleService} from './vehicle.service';

@Controller('/vehicle')
export class VehicleController extends BaseController<Vehicle> {
    constructor(private readonly vehicleService: VehicleService) {
        super(vehicleService);
    }

    @Post('/findAvailableVehiclesByDateRange')
    findByDateRange(
        @Body() dates: {startTimestamp: number; endTimestamp: number},
    ): Promise<Vehicle[]> {
        return this.vehicleService.findAvailableVehiclesByDateRange(
            dates.startTimestamp,
            dates.endTimestamp,
        );
    }

    @Post('/findByMakeAndModel')
    findByMakeAndModel(@Body() baseQuery: any): Promise<Vehicle[]> {
        return this.vehicleService.findByMakeAndModel(
            baseQuery.make,
            baseQuery.model,
        );
    }

    @Post('/countWithFilter')
    countWithFilter(@Body() baseQuery: any): Promise<number> {
        return this.vehicleService.countWithFilter(baseQuery);
    }

    @Delete('/:id')
    deleteVehicle(@Param('id') id: string): Promise<Vehicle> {
        return this.vehicleService.delete(id);
    }

    @Get('/vehicle')
    getVehicle(@Body() baseQuery: any) {
        console.log('vehicle!!!');
    }
}
