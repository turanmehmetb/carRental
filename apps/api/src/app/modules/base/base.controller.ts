import { BaseModel } from "@carRental/models";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BaseService } from "./base.service";

@Controller()
export class BaseController<T extends BaseModel> {
  constructor(private readonly service: BaseService<T>) {}

  @Get()
  getAll(): Promise<T[]> {
    return this.service.getAll();
  }
  
  @Get("/findAllByStatus/")
  findAllByStatus(): Promise<T[]> {
    return this.service.findAllByStatus();
  }

  @Get("/findByStatus/:id")
  findByIdAndStatus(@Param("id") id: string): Promise<T> {
    return this.service.findByStatus(id);
  }

  @Get("/findCount/")
  findCount(): Promise<number> {
    return this.service.findCount();
  }

  @Get("/findCountByStatus/")
  findCountByStatus(): Promise<number> {
    return this.service.findCountByStatus();
  }

  @Get(":id")
  get(@Param("id") id: string): Promise<T> {
    return this.service.get(id);
  }

  @Post()
  save(@Body() entity: T): Promise<T> {
    return this.service.save(entity);
  }

  @Post("/saveNewWithId")
  saveWithId(@Body() entity: T): Promise<T> {
    return this.service.saveNewWithId(entity);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.service.delete(id);
  }

  @Delete()
  deleteAll() {
    return this.service.deleteAll();
  }

  @Post("saveWithoutId")
  saveWithoutId(@Body() entity: T): Promise<T> {
    delete entity._id;
    return this.service.save(entity);
  }

  @Post("/insertMany")
  insertMany(@Body() entity: T[]): Promise<T[]> {
    return this.service.insertMany(entity);
  }

  @Post("/updateMany")
  updateMany(@Body() entity: T[]): void {
    this.service.updateMany(entity);
  }

  @Post("/deleteMany")
  deleteMany(@Body() ids: string[]): Promise<any> {
    return this.service.deleteMany(ids);
  }

  @Put("/delete")
  deleteByStatus(@Body() entity: T) {
    return this.service.deleteByStatus(entity);
  }

  @Put()
  async update(@Body() entity: T): Promise<Promise<T>> {
    return this.update(entity);
  }
}