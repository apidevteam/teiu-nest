import { Category, Filter, ServiceContract } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService implements ServiceContract {

    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>,
        private readonly filter: Filter
    ) { }

    public async search(filters?: Category) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: ["products"]
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ["products"]
        })
    }

    public async create(category: Category) {
        return await this.repository.save(category)
    }

    public async update(id: number, category: Category) {
        await this.repository.update(id, category)
        return await this.findById(id)
    }

    public async delete(id: number) {
        await this.repository.delete(id)
    }

}
