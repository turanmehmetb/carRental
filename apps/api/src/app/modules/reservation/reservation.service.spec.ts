import {Reservation} from '@carRental/models';
import {ConfigService} from '@nestjs/config';
import {getModelToken} from '@nestjs/mongoose';
import {Test, TestingModule} from '@nestjs/testing';

import {ReservationService} from './reservation.service';

describe('ReservationService', () => {
    let service: ReservationService;
    let mockReservationModel;
    let execMock;

    beforeEach(async () => {
        execMock = jest.fn().mockResolvedValue([
            {
                _id: '123',
                user: 'userId123',
                vehicle: 'vehicleId123',
                startDate: Date.now(),
                endDate: Date.now() + 86400000, // 1 day later
                reservationStatus: 'pending',
            },
        ]);

        mockReservationModel = {
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

        mockReservationModel.find.mockImplementation(() => ({exec: execMock}));

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReservationService,
                {
                    provide: getModelToken(Reservation.name),
                    useValue: mockReservationModel,
                },
                ConfigService,
            ],
        }).compile();

        service = module.get<ReservationService>(ReservationService);
    });

    describe('findByUserId', () => {
        it('should return reservations based on the provided user id', async () => {
            const userId = 'userId123';
            const result = await service.findByUserId(userId);

            expect(result).toHaveLength(1);
            expect(result[0].user).toEqual(userId);
            expect(mockReservationModel.find).toHaveBeenCalledWith({
                user: userId,
            });
            expect(execMock).toHaveBeenCalled();
        });
    });
});
