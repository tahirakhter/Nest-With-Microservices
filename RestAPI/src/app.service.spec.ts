import { HttpException, ServiceUnavailableException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, of, throwError } from 'rxjs';
import { AppService } from './app.service';

describe('AppService', () => {
  const client = { send: jest.fn(), emit: jest.fn() };
  let service: AppService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AppService(client as unknown as ClientProxy);
  });

  it('uses request-response messaging to create an item', async () => {
    const item = { id: 1, name: 'Example item' };
    const itemDto = { name: 'Example item' };
    client.send.mockReturnValue(of(item));

    await expect(lastValueFrom(service.createItem(itemDto))).resolves.toEqual(
      item,
    );
    expect(client.send).toHaveBeenCalledWith(
      { role: 'item', cmd: 'create' },
      itemDto,
    );
  });

  it('publishes an item-created event and acknowledges publication', async () => {
    const itemDto = { name: 'Example item' };
    client.emit.mockReturnValue(of(undefined));

    await expect(
      lastValueFrom(service.createItemEvent(itemDto)),
    ).resolves.toEqual({ message: 'Create event published' });
    expect(client.emit).toHaveBeenCalledWith('item_created', itemDto);
  });

  it('publishes an item lookup event and acknowledges publication', async () => {
    client.emit.mockReturnValue(of(undefined));

    await expect(
      lastValueFrom(service.getItemByIdEvent(7)),
    ).resolves.toEqual({ message: 'Item lookup event published' });
    expect(client.emit).toHaveBeenCalledWith('get-item-by-id', 7);
  });

  it('translates RPC validation errors to HTTP errors', async () => {
    client.send.mockReturnValue(
      throwError(() => ({ statusCode: 400, message: 'Invalid item name' })),
    );

    await expect(
      lastValueFrom(service.createItem({ name: '' })),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it('reports an unavailable microservice when the RPC error is unknown', async () => {
    client.send.mockReturnValue(
      throwError(() => new Error('Connection failed')),
    );

    await expect(
      lastValueFrom(service.getItemById(1)),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});