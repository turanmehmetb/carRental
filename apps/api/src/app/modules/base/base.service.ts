import { BaseModel } from "@carRental/models";
import { BadGatewayException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';

@Injectable()
export class BaseService<T extends BaseModel> {
  constructor(private readonly model: Model<T>) {}

  async save(entity: Partial<T>): Promise<T> {
    const createdModel = new this.model(entity);
    createdModel.isNew = entity._id == null ? true : false;
    try {
      return await createdModel.save();
    } catch(err) {
      throw new HttpException(this.model.modelName + 'Exists', HttpStatus.BAD_REQUEST);
    }
  }

  async saveNewWithId(entity: T): Promise<T> {
    const createdModel = new this.model(entity);
    createdModel.isNew = true;
    try {
      return await createdModel.save();
    } catch {
      throw new HttpException(this.model.modelName + 'Exists', HttpStatus.BAD_REQUEST);
    }
  }

  getAll(): Promise<T[]> {
    try {
      return this.model
        .find({})
        .sort({_id: -1})
        .exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  get(id: string): Promise<T> {
    try {
      return this.model.findById(id).exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  delete(id: string): Promise<T> {
    try {
      return this.model.findByIdAndDelete(id, { returnDocument: 'after' }).exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  deleteAll() {
    try {
      return this.model.deleteMany({}).exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async deleteByStatus(entity: T) {
    try {
      entity.db = 0
      await this.save(entity)
    } catch (error) {
      throw new BadGatewayException(error)
    }
  }

  deleteAllByStatus() {
    try {
      return this.model.updateMany().where().set('db', 0).exec()
    } catch (error) {
      throw new BadGatewayException(error)
    }
  }

  insertMany(entity: T[]): Promise<T[]> {
    try {
      return this.model.insertMany(entity);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  updateMany(entity: T[]): void {
    try {
      entity.forEach(el => this.model.findOneAndUpdate({"_id": el._id}, el).exec());
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  deleteMany(ids: string[]): Promise<any> {
    try {
      return this.model.deleteMany().where({_id: { $in: ids}}).exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findAllByStatus(): Promise<T[]> {
    try {
      return this.model.find().where({ db: "1" }).exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findByStatus(id: string): Promise<T> {
    try {
      return this.model.findOne().where({ _id: id, db: 1 }).exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findCount(): Promise<number> {
    try {
      return this.model.count().exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  
  findCountByStatus(): Promise<number> {
    try {
      return this.model.count().where({ db: 1 }).exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

}