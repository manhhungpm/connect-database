// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// export class TaskService {}

import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepo.find();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskRepo.findOne({
      where: { id: parseInt(id, 10) },
    });
  }

  async create(task: Task): Promise<Task> {
    return await this.taskRepo.save(task);
  }

  async update(task: Task): Promise<UpdateResult> {
    return await this.taskRepo.update(task.id, task);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<Task[]> {
    return await this.taskRepo.find({ relations: ['status'] });
  }
}
