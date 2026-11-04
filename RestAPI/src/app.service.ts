import {
  HttpException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  catchError,
  defer,
  endWith,
  ignoreElements,
  Observable,
  throwError,
} from 'rxjs';

export interface CreateItemDto {
  name: string;
}

export interface Item {
  id: number;
  name: string;
}

export interface EventAcknowledgement {
  message: string;
}

@Injectable()
export class AppService {
  constructor(
    @Inject('ITEM_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createItem(createItemDto: CreateItemDto): Observable<Item> {
    return this.client
      .send<Item>({ role: 'item', cmd: 'create' }, createItemDto)
      .pipe(catchError((error: unknown) => this.mapRpcError(error)));
  }

  getItemById(id: number): Observable<Item> {
    return this.client
      .send<Item>({ role: 'item', cmd: 'get-by-id' }, id)
      .pipe(catchError((error: unknown) => this.mapRpcError(error)));
  }

  createItemEvent(
    createItemDto: CreateItemDto,
  ): Observable<EventAcknowledgement> {
    return this.publishEvent('item_created', createItemDto, 'Create event published');
  }

  getItemByIdEvent(id: number): Observable<EventAcknowledgement> {
    return this.publishEvent(
      'get-item-by-id',
      id,
      'Item lookup event published',
    );
  }

  private publishEvent(
    pattern: string,
    payload: unknown,
    message: string,
  ): Observable<EventAcknowledgement> {
    return defer(() => this.client.emit(pattern, payload)).pipe(
      ignoreElements(),
      endWith({ message }),
      catchError((error: unknown) => this.mapRpcError(error)),
    );
  }

  private mapRpcError(error: unknown): Observable<never> {
    if (typeof error === 'object' && error !== null) {
      const rpcError = error as { statusCode?: unknown; message?: unknown };
      const statusCode = rpcError.statusCode;
      const message = rpcError.message;
      if (
        typeof statusCode === 'number' &&
        statusCode >= 400 &&
        statusCode <= 599 &&
        typeof message === 'string'
      ) {
        return throwError(() => new HttpException(message, statusCode));
      }
    }

    return throwError(
      () => new ServiceUnavailableException('Item microservice is unavailable'),
    );
  }
}
