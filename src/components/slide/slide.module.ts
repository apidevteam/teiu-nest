import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image';
import { Slide } from 'src/entities/slide';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { SaveSlideValidation } from 'src/validations/save-slide.validation';
import { ImageService } from '../image/image.service';
import { SlideController } from './slide.controller';
import { SlideService } from './slide.service';

@Module({
  controllers: [SlideController],
  providers: [SlideService, CloudinaryService, SaveSlideValidation, Filter, ImageService],
  imports: [TypeOrmModule.forFeature([Slide, Image])],
  exports: [TypeOrmModule]
})
export class SlideModule { }
