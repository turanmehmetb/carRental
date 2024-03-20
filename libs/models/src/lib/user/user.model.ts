import {keyValueSetter} from '@carRental/utils';

import {BaseModel} from '../base.model';

export class User extends BaseModel {
    userId: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;

    constructor(entity?: User) {
        super();
        if (entity) keyValueSetter(this, entity);
    }
}
