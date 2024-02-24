import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DataService } from './data.service';
import { Data } from './model/data.entity';
import { UpdateResult } from 'typeorm';
import { DataDto } from './dtos/data.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get(':id')
  async getDataById(@Param('id') id: string) {
    return await this.dataService.getById(id);
  }

  @Post(':id')
  async createData(
    @Param('id') id: string,
    @Body() data: DataDto,
  ): Promise<Data> {
    return await this.dataService.create(id, data);
  }

  @Put(':id')
  async updateData(
    @Param('id') id: string,
    @Body() data: DataDto,
  ): Promise<UpdateResult> {
    return await this.dataService.update(id, data);
  }

  @Delete(':id')
  async deleteData(@Param('id') id: string): Promise<void> {
    await this.dataService.delete(id);
  }
}
