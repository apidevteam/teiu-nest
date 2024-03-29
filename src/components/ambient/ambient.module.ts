import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAmbient } from 'src/entities/product/product-ambient';
import { SaveAmbientValidation } from 'src/validations/save-ambient.validation';
import { LanguageModule } from '../language/language.module';
import { LanguageService } from '../language/language.service';
import { AmbientController } from './ambient.controller';
import { AmbientService } from './ambient.service';

@Module({
  controllers: [AmbientController],
  providers: [AmbientService, Filter, LanguageService, SaveAmbientValidation],
  imports: [TypeOrmModule.forFeature([ProductAmbient]), LanguageModule]
})
export class AmbientModule { }
