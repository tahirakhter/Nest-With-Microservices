import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

interface CreateItemDto {
  name?: unknown;
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    this.logger.log('Fetching hello message');
    return 'Hello World!';
  }

  async createItem(itemDto: unknown) {
    const name =
      typeof itemDto === 'object' && itemDto !== null && 'name' in itemDto
        ? (itemDto as CreateItemDto).name
        : undefined;

    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new RpcException({
        statusCode: 400,
        message: 'Item name must be a non-empty string',
      });
    }

    const item = await this.prisma.item.create({
      data: { name: name.trim() },
    });

    this.logger.log(`Created item ${item.id}`);
    return item;
  }

  async getItemById(id: number | string) {
    const numId =
      typeof id === 'number'
        ? id
        : /^\d+$/.test(id)
          ? Number(id)
          : Number.NaN;

    if (!Number.isSafeInteger(numId) || numId <= 0) {
      throw new RpcException({
        statusCode: 400,
        message: 'Item ID must be a positive integer',
      });
    }

    const item = await this.prisma.item.findUnique({
      where: { id: numId },
    });

    if (!item) {
      throw new RpcException({
        statusCode: 404,
        message: `Item with ID ${numId} not found`,
      });
    }

    return item;
  }
}
