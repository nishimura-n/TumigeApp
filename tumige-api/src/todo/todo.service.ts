import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Favorite } from '@prisma/client';
import * as fs from 'fs';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  getTasks(userId: number): Promise<Favorite[]> {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  getTaskById(userId: number, taskId: number): Promise<Favorite> {
    return this.prisma.favorite.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });
  }

  async createTask(
    userId: number,
    dto: CreateTaskDto,
    fileName: string,
  ): Promise<Favorite> {
    const task = await this.prisma.favorite.create({
      data: {
        userId,
        title: dto.title,
        note: dto.note,
        rank: parseInt(dto.rank, 10),
        tag: dto.tag,
        fav: JSON.parse(dto.fav),
        fileName,
      },
    });
    return task;
  }

  async updateTaskById(
    userId: number,
    taskId: number,
    dto: UpdateTaskDto,
    fileName: string,
  ): Promise<Favorite> {
    const task = await this.prisma.favorite.findUnique({
      where: {
        id: taskId,
      },
    });
    if (dto.oldfile != 'favicon.ico' && dto.oldfile != fileName) {
      await fs.promises.unlink('../tumige-nextjs/public/' + task.fileName);
    }

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permission to update');

    return this.prisma.favorite.update({
      where: {
        id: taskId,
      },
      data: {
        userId,
        title: dto.title,
        note: dto.note,
        rank: parseInt(dto.rank, 10),
        tag: dto.tag,
        fav: JSON.parse(dto.fav),
        fileName,
      },
    });
  }
  async deleteTaskById(userId: number, taskId: number): Promise<void> {
    const task = await this.prisma.favorite.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permission to delete');

    if (task.fileName != 'favicon.ico') {
      await fs.promises.unlink('../tumige-nextjs/public/' + task.fileName);
    }

    await this.prisma.favorite.delete({
      where: {
        id: taskId,
      },
    });
  }
}
