import { Filter } from '@apidevteam/core-nestjs/lib/helpers/index';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAmbient } from 'src/entities/product/product-ambient';
import { SaveAmbientValidation } from 'src/validations/save-ambient.validation';
import { Repository } from 'typeorm';
import { LanguageService } from '../language/language.service';

@Injectable()
export class AmbientService {

    private readonly relations: string[] = ['language', 'language.flagImage', 'products', 'products.details', 'products.details.image']
    private readonly logger = new Logger(AmbientService.name)

    constructor(
        @InjectRepository(ProductAmbient)
        private readonly repository: Repository<ProductAmbient>,
        private readonly filter: Filter,
        private readonly languageService: LanguageService,
        private readonly saveAmbientValidation: SaveAmbientValidation
    ) { }

    public async search(filters?: ProductAmbient) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: this.relations
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: this.relations
        })
    }

    public async save(ambient: ProductAmbient) {
        await this.saveAmbientValidation.validate(ambient)

        return await this.repository.save(ambient)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

}
