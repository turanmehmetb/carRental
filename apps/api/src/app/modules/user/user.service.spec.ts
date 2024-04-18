import {User} from '@carRental/models';
import {ConfigService} from '@nestjs/config';
import {getModelToken} from '@nestjs/mongoose';
import {Test, TestingModule} from '@nestjs/testing';

import {UserService} from './user.service';

describe('UserService', () => {
    let service: UserService;
    let mockUserModel;

    beforeEach(async () => {
        function MockModel(dto) {
            return {
                ...dto,
                _id: 'some-new-id',
                save: jest.fn().mockResolvedValue(dto),
            };
        }

        mockUserModel = {
            find: jest.fn().mockReturnThis(),
            findOne: jest.fn().mockReturnThis(),
            constructor: MockModel,
            count: jest.fn(() => ({
                where: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(1),
            })),
            exec: jest.fn().mockResolvedValueOnce([]), // Default mock to return an empty array
            where: jest.fn().mockReturnThis(),
            save: jest.fn().mockImplementation(function () {
                return Promise.resolve(this);
            }),
            create: jest.fn().mockImplementation((createDto) => {
                return Promise.resolve(createDto); // Simulate successful save operation
            }),
        };

        mockUserModel.constructor = MockModel;
        mockUserModel.constructor.prototype.save = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                },
                {
                    provide: User.name,
                    useValue: {},
                },
                ConfigService,
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
            const baseQuery = {name: 'John2'};
            const result = await service.countWithFilter(baseQuery);
            expect(result).toEqual(1);
            expect(mockUserModel.count).toHaveBeenCalled();
        });
    });

    describe('findByStatus', () => {
        it('should return a single user based on the provided ID and status', async () => {
            const user = {
                _id: '65f255dce31f2b189ab4e466',
                userId: '4',
                email: 'user@example.com',
                password: 'securePassword',
                name: 'John',
                surname: 'Doe',
                phone: '1234567890',
                userDetails: 'testing',
                db: 1,
            };

            mockUserModel.findOne = jest.fn().mockReturnValue({
                where: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(user),
            });

            const userId = '65f255dce31f2b189ab4e466';
            const result = await service.findByStatus(userId);

            expect(result).toEqual(user);
            expect(mockUserModel.findOne).toHaveBeenCalledWith();
            expect(mockUserModel.findOne().where).toHaveBeenCalledWith({
                _id: userId,
                db: 1,
            });
        });
    });
});
