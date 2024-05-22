import {User} from '@carRental/models';

export class UserMockData {
    public static defaultUsers: User[] = [
        {
            db: 1,
            email: 'john@example.com',
            password: 'password123',
            name: 'John',
            surname: 'Doe',
            phone: '1234567890',
        },
        {
            db: 1,
            email: 'jane@example.com',
            password: 'password456',
            name: 'Jane',
            surname: 'Smith',
            phone: '9876543210',
        },
        {
            db: 1,
            email: 'alice@example.com',
            password: 'password789',
            name: 'Alice',
            surname: 'Johnson',
            phone: '5551234567',
        },
    ] as User[];
}
