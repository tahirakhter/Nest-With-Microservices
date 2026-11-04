import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AppService,
  CreateItemDto,
  EventAcknowledgement,
  Item,
} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('item/:id')
  getById(@Param('id', ParseIntPipe) id: number): Observable<Item> {
    return this.appService.getItemById(id);
  }

  @Post('create')
  create(@Body() createItemDto: CreateItemDto): Observable<Item> {
    return this.appService.createItem(createItemDto);
  }

  @Post('events/create')
  createItemEvent(
    @Body() createItemDto: CreateItemDto,
  ): Observable<EventAcknowledgement> {
    return this.appService.createItemEvent(createItemDto);
  }

  @Get('events/item/:id')
  getItemByIdEvent(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<EventAcknowledgement> {
    return this.appService.getItemByIdEvent(id);
  }
}
