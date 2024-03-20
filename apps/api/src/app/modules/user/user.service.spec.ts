import {User} from '@carRental/models';
import {ConfigService} from '@nestjs/config';
import {getModelToken} from '@nestjs/mongoose';
import {Test, TestingModule} from '@nestjs/testing';

import {UserService} from './user.service';

describe('UserService', () => {
    let service: UserService;
    let mockUserModel;

    beforeEach(async () => {
        mockUserModel = {
            find: jest.fn().mockReturnThis(),
            count: jest.fn(() => ({
                where: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(1),
            })),
            // Mocking count to return an object that has a where method, which itself returns an object that has an exec method
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                },
                {
                    provide: User.name,
                    useValue: {}, // Assuming LoggerService does not need specific mocking
                },
                ConfigService, // Mock if necessary
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    describe('findWithFilter', () => {
        it('should return a list of users based on the provided filter', async () => {
            const sampleUsers = [
                {
                    _id: '65f255dce31f2b189ab4e466',
                    userId: '4',
                    email: 'user@example.com',
                    password: 'securePassword',
                    name: 'John2',
                    surname: 'Doe2',
                    phone: '1234567890',
                    userDetails: 'testing',
                },
            ];
            mockUserModel.find.mockReturnValue({
                where: jest.fn().mockReturnThis(),
                sort: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(sampleUsers),
            });

            const baseQuery = {name: 'John2'};
            const result = await service.findWithFilter(baseQuery);
            expect(result).toEqual(sampleUsers);
            expect(mockUserModel.find).toHaveBeenCalled();
        });
    });

    describe('countWithFilter', () => {
        it('should return the count of users based on the provided filter', async () => {
            // Assuming count().where().exec() pattern is being tested,
            // no changes are needed here if the mock setup is adjusted as above.
            const baseQuery = {name: 'John2'};
            const result = await service.countWithFilter(baseQuery);
            expect(result).toEqual(1);
            expect(mockUserModel.count).toHaveBeenCalled(); // This checks if count was called
            // If you need to assert that where was called with the correct query,
            // you might need to add more detailed assertions depending on how detailed your mocks are.
        });
    });

    // Add more tests for other methods as needed
});
