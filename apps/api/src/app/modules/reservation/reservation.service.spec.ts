import {Model} from 'mongoose';

import {Reservation, ReservationStatus} from '@carRental/models';
import {getModelToken} from '@nestjs/mongoose';
import {Test, TestingModule} from '@nestjs/testing';

import {ReservationService} from './reservation.service';

describe('ReservationService', () => {
    let service: ReservationService;
    let mockReservationModel: Model<Reservation>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReservationService,
                {
                    provide: getModelToken('Reservation'),
                    useValue: {
                        find: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ReservationService>(ReservationService);
        mockReservationModel = module.get<Model<Reservation>>(
            getModelToken('Reservation'),
        );
    });

    describe('findByDateRange', () => {
        it('should return reservations within the specified date range', async () => {
            const startTimestamp = 1621750862000;
            const endTimestamp = 1621754462000;
            const reservations: Reservation[] = [];
            jest.spyOn(mockReservationModel, 'find').mockReturnValue({
                exec: jest.fn().mockResolvedValue(reservations),
            } as any);

            const result = await service.findByDateRange(
                startTimestamp,
                endTimestamp,
            );

            expect(mockReservationModel.find).toHaveBeenCalledWith({
                $or: [
                    {startDate: {$gte: startTimestamp, $lte: endTimestamp}},
                    {endDate: {$gte: startTimestamp, $lte: endTimestamp}},
                ],
            });
            expect(result).toEqual(reservations);
        });
    });
});
