import { RpcException } from '@nestjs/microservices';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppService', () => {
  const prisma = {
    item: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  let service: AppService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AppService(prisma as unknown as PrismaService);
  });

  describe('createItem', () => {
    it('trims and persists the item name', async () => {
      prisma.item.create.mockResolvedValue({ id: 1, name: 'Example item' });

      await expect(
        service.createItem({ name: ' Example item ' }),
      ).resolves.toEqual({
        id: 1,
        name: 'Example item',
      });
      expect(prisma.item.create).toHaveBeenCalledWith({
        data: { name: 'Example item' },
      });
    });

    it('rejects invalid item names with an RPC error', async () => {
      await expect(service.createItem({ name: '  ' })).rejects.toBeInstanceOf(
        RpcException,
      );
      expect(prisma.item.create).not.toHaveBeenCalled();
    });
  });

  describe('getItemById', () => {
    it('rejects malformed IDs instead of partially parsing them', async () => {
      await expect(service.getItemById('12abc')).rejects.toBeInstanceOf(
        RpcException,
      );
      expect(prisma.item.findUnique).not.toHaveBeenCalled();
    });

    it('returns a not-found RPC error for missing items', async () => {
      prisma.item.findUnique.mockResolvedValue(null);

      await expect(
        service.getItemById(7),
      ).rejects.toBeInstanceOf(RpcException);
    });
  });
});