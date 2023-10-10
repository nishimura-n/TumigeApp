import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Favorite } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './todo';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTasks(@Req() req: Request): Promise<Favorite[]> {
    return this.todoService.getTasks(req.user.id);
  }

  @Get(':id')
  getTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Favorite> {
    return this.todoService.getTaskById(req.user.id, taskId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../tumige-nextjs/public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 * 4 },
    }),
  )
  createTask(
    @Req() req: Request,
    @Body() dto: CreateTaskDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Favorite> {
    console.log(req);
    let uploadedFileName = 'favicon.ico';
    if (file) {
      uploadedFileName = `${file.filename}`;
    }
    return this.todoService.createTask(req.user.id, dto, uploadedFileName);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../tumige-nextjs/public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 * 4 },
    }),
  )
  updateTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Favorite> {
    let uploadedFileName = `${dto.oldfile}`;
    if (file) {
      uploadedFileName = `${file.filename}`;
    }
    return this.todoService.updateTaskById(
      req.user.id,
      taskId,
      dto,
      uploadedFileName,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<void> {
    return this.todoService.deleteTaskById(req.user.id, taskId);
  }
}
