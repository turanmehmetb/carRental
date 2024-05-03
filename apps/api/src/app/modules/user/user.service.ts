import { Model } from 'mongoose';

import { User } from '@carRental/models';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { BaseService } from '../base/base.service';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @Inject(User.name) private readonly logger: LoggerService,
        private readonly jwtService: JwtService,
    ) {
        super(userModel);
    }

    async login(credentials: User): Promise<{ accessToken: string, userId: string }> {
        return this.validate(credentials.email, credentials.password).then( async user => this.createToken(user));
    }

    async register(user: User): Promise<User> {
        try {
            if(user.password) user.password = await bcrypt.hash(user.password, 10);
            const savedUser = await this.save(user);
            return savedUser;
        }
        catch(error) {
            this.logger.error(`[${this.register.name}]: ${error}`);
            throw new Error(error.message);
        }
    }

    async validate(email, password): Promise<User> {
        const user = await this.userModel.findOne().where({ email: email }).exec();
        if(user) {
            if(await bcrypt.compare(password, user.password)) 
                return user;
            else throw new Error('InvalidCredentials');
        }
        else throw new Error('InvalidCredentials');
    }

    async changePassword(email: string, password: string): Promise<User> {
        try {
            password = await bcrypt.hash(password, 10);
            return this.userModel.findOneAndUpdate({ email: email }, { $set: { password: password } }, { returnDocument: 'after' });       
        }
        catch(error) {
            this.logger.error(`[${this.changePassword.name}]: ${error}`);
            return null;
        }
    }

    private async createToken(user: User): Promise<{ accessToken: string, userId: string }> {
        const payload: { user: User; login_date: number; status: number } = {
          user: user,
          login_date: 0,
          status: 0,
        };
        payload.login_date = Date.now();
        payload.status = 200;
        const accessToken = this.jwtService.sign(payload);
        const userId = user.userId;
        return { accessToken, userId };
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

    getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne().where({email: email, db:1}).exec();
    }

    getUserByUserId(userId: string): Promise<User> {
        return this.userModel.findOne().where({userId: userId, db:1}).exec();
    }
}
