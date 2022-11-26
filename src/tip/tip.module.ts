import { Filter, Tip } from '@apicore/teiu/lib';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { TipController } from './tip.controller';
import { TipService } from './tip.service';

@Module({
  controllers: [TipController],
  providers: [TipService, Filter, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Tip])]
})
export class TipModule { }
