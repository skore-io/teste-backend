import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { VideoModel } from '../models/video.model'
import { InjectRepository } from '@nestjs/typeorm'

@ValidatorConstraint({ async: true })
@Injectable()
export class VideoUniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(VideoModel)
    private readonly repository: Repository<VideoModel>,
  ) {}

  async validate(value: number, args: ValidationArguments): Promise<boolean> {
    return await this.repository.findOne({ id: value }).then(video => {
      return !video
    })
  }

  defaultMessage(args: ValidationArguments) {
    return 'the given id already exists'
  }
}
