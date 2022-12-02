import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from 'src/entities/core/filter';
import { Tip } from 'src/entities/tip';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { TipController } from './tip.controller';
import { TipService } from './tip.service';

@Module({
  controllers: [TipController],
  providers: [TipService, Filter, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Tip])]
})
export class TipModule { }