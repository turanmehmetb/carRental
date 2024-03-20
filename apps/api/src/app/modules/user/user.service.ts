import {Model} from 'mongoose';

import {User} from '@carRental/models';
import {Inject, Injectable, LoggerService} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectModel} from '@nestjs/mongoose';

import {BaseService} from '../base/base.service';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @Inject(User.name) protected readonly logger: LoggerService,
        protected readonly configService: ConfigService,
    ) {
        super(userModel);
    }

    countWithFilter(baseQuery: unknown): Promise<number> {
        let query = {db: 1};

        query = this.getFilterQuery(baseQuery, query);

        return this.userModel.count().where(query).exec();
    }

    findWithFilter(baseQuery: any): Promise<User[]> {
        // console.log(baseQuery)
        const query: {where: any; order: any; skip: number; take: number} = {
            where: {db: 1},
            skip: baseQuery.first ? parseInt(baseQuery.first.toString()) : null,
            take: baseQuery.rows ? parseInt(baseQuery.rows.toString()) : null,
            order: baseQuery.sortOrder
                ? {[baseQuery.sortField]: baseQuery.sortOrder}
                : {_id: 1},
        };

        query.where = this.getFilterQuery(baseQuery, query.where);

        // console.log("where" ,query.where, "-")
        return this.userModel
            .find()
            .where()
            .sort(query.order)
            .limit(query.take)
            .skip(query.skip)
            .exec();
    }

    getFilterQuery(baseQuery: any, query: {db: number}) {
        baseQuery.userId
            ? (query['userId'] = {$regex: baseQuery.userId, $options: 'i'})
            : null;
        baseQuery.name
            ? (query['name'] = {$regex: baseQuery.name, $options: 'i'})
            : null;
        baseQuery.surname
            ? (query['surname'] = {$regex: baseQuery.surname, $options: 'i'})
            : null;

        return query;
    }
}
