import {FuelType, Vehicle, VehicleType} from '@carRental/models';
import {ConfigService} from '@nestjs/config';
import {getModelToken} from '@nestjs/mongoose';
import {Test, TestingModule} from '@nestjs/testing';

import {VehicleService} from './vehicle.service';

describe('VehicleService', () => {
    let service: VehicleService;
    let mockVehicleModel;
    let execMock; // Declare execMock at a higher scope

    beforeEach(async () => {
        execMock = jest.fn().mockResolvedValue([
            {
                _id: '123',
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
        ]); // Create a single consistent exec mock

        mockVehicleModel = {
            find: jest.fn().mockReturnThis(),
            findOne: jest.fn().mockReturnThis(),
            count: jest.fn(() => ({
                where: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(1),
            })),
            exec: execMock,
            where: jest.fn().mockReturnThis(),
            create: jest.fn().mockImplementation((createDto) => {
                return Promise.resolve(createDto);
            }),
        };

        mockVehicleModel.find.mockImplementation(() => ({exec: execMock})); // Use execMock consistently

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehicleService,
                {
                    provide: getModelToken(Vehicle.name),
                    useValue: mockVehicleModel,
                },
                ConfigService,
            ],
        }).compile();

        service = module.get<VehicleService>(VehicleService);
    });

    describe('countWithFilter', () => {
        it('should return the count of vehicles based on the provided filter', async () => {
            const baseQuery = {brandName: 'Ford'};
            const result = await service.countWithFilter(baseQuery);

            expect(result).toEqual(1); // Ensure the count matches the mocked response
            expect(mockVehicleModel.count).toHaveBeenCalled();
        });
    });

    describe('findByMakeAndModel', () => {
        it('should return vehicles based on the provided make and model', async () => {
            const make = 'Ford';
            const model = 'Kuga';
            const result = await service.findByMakeAndModel(make, model);

            expect(result).toHaveLength(1); // Check if the result array length is correct
            expect(result[0].brandName).toEqual(make); // More detailed checks can be added
            expect(mockVehicleModel.find).toHaveBeenCalledWith({make, model});
            expect(execMock).toHaveBeenCalled(); // Check if exec was called using the consistent reference
        });
    });
});
