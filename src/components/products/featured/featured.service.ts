import { Filter } from '@apicore/nestjs/lib';
import { FeaturedDTO } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Featured } from 'src/entities/featured';
import { Image } from 'src/entities/image';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class FeaturedService {

    constructor(
        @InjectRepository(Featured)
        private readonly repository: Repository<Featured>,
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly filter: Filter,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    public async search(filters?: Featured) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ['image']
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['image']
        })
    }

    public async save(featuredProduct: FeaturedDTO) {
        featuredProduct = await this.saveImage(featuredProduct)
        return await this.repository.save(featuredProduct)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

    private async saveImage(featuredProduct: FeaturedDTO) {
        if (!featuredProduct.image.link && featuredProduct.image.base64src) {
            featuredProduct.image = await this.cloudinaryService.uploadImageDto(
                featuredProduct.image,
                `teiu/destaques`
            )

            featuredProduct.image = await this.imageRepository.save(featuredProduct.image)
        }

        return featuredProduct
    }

}
