
import { BaseModel } from '../base.model';

export class User extends BaseModel {
    userId: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
}
