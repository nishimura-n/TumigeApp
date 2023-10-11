import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tumige } from '@prisma/client';
import * as fs from 'fs';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  getTasks(userId: number): Promise<Tumige[]> {
    return this.prisma.tumige.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  getTaskById(userId: number, taskId: number): Promise<Tumige> {
    return this.prisma.tumige.findFirst({
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
  ): Promise<Tumige> {
    const task = await this.prisma.tumige.create({
      data: {
        userId,
        title: dto.title,
        note: dto.note,
        rank: parseInt(dto.rank, 10),
        tag: dto.tag,
        isBuy: JSON.parse(dto.isBuy),
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
  ): Promise<Tumige> {
    const task = await this.prisma.tumige.findUnique({
      where: {
        id: taskId,
      },
    });
    if (dto.oldfile != 'favicon.ico' && dto.oldfile != fileName) {
      await fs.promises.unlink('../tumige-nextjs/public/' + task.fileName);
    }

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permission to update');

    return this.prisma.tumige.update({
      where: {
        id: taskId,
      },
      data: {
        userId,
        title: dto.title,
        note: dto.note,
        rank: parseInt(dto.rank, 10),
        tag: dto.tag,
        isBuy: JSON.parse(dto.isBuy),
        fileName,
      },
    });
  }
  async deleteTaskById(userId: number, taskId: number): Promise<void> {
    const task = await this.prisma.tumige.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permission to delete');

    if (task.fileName != 'favicon.ico') {
      await fs.promises.unlink('../tumige-nextjs/public/' + task.fileName);
    }

    await this.prisma.tumige.delete({
      where: {
        id: taskId,
      },
    });
  }
}
