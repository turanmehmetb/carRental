import {Vehicle} from '@carRental/models';
import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';

import {BaseController} from '../base/base.controller';
import {VehicleService} from './vehicle.service';

@Controller('/vehicle')
export class VehicleController extends BaseController<Vehicle> {
    constructor(private readonly vehicleService: VehicleService) {
        super(vehicleService);
    }

    // Example custom method to find vehicles by make and model
    @Post('/findByMakeAndModel')
    findByMakeAndModel(@Body() baseQuery: any): Promise<Vehicle[]> {
        return this.vehicleService.findByMakeAndModel(
            baseQuery.make,
            baseQuery.model,
        );
    }

    // Example method to count vehicles with a filter
    @Post('/countWithFilter')
    countWithFilter(@Body() baseQuery: any): Promise<number> {
        // Assuming VehicleService has a countWithFilter method similar to UserService
        return this.vehicleService.countWithFilter(baseQuery);
    }

    @Delete('/:id')
    deleteVehicle(@Param('id') id: string): Promise<Vehicle> {
        return this.vehicleService.delete(id); // Leveraging the 'delete' method from BaseService
    }

    @Get('/vehicle')
    getVehicle(@Body() baseQuery: any) {
        console.log('vehicle!!!');
    }
}
