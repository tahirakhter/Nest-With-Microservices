import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ role: 'item', cmd: 'create' })
  createItem(itemDto: unknown) {
    return this.appService.createItem(itemDto);
  }

  @MessagePattern({ role: 'item', cmd: 'get-by-id' })
  getItemById(id: number | string) {
    return this.appService.getItemById(id);
  }

  @EventPattern('item_created')
  handleItemCreatedEvent(itemDto: unknown) {
    return this.appService.createItem(itemDto);
  }

  @EventPattern('get-item-by-id')
  handleGetItemEvent(id: number | string) {
    return this.appService.getItemById(id);
  }
}
