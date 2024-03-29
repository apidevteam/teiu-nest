import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Featured } from 'src/entities/featured';
import { FeaturedService } from './featured.service';

@Controller('featured')
@ApiTags('Featured Products')
export class FeaturedController {

    constructor(
        private readonly service: FeaturedService
    ) { }

    @Get()
    public async searchFeatured(@Query() filters?: Featured) {
        return await this.service.search(filters)
    }

    @Get(':id')
    public async findFeaturedById(@Param('id') id: number) {
        return await this.service.findById(id)
    }

    @Post()
    public async saveFeatured(@Body() featuredProduct) {
        return await this.service.save(featuredProduct)
    }

    @Put(":id")
    public async updateFeatured(@Param("id") id: number, @Body() featuredProduct) {
        return await this.service.update(id, featuredProduct)
    }

    @Delete(':id')
    public async deleteFeatured(@Param('id') id: number) {
        return await this.service.delete(id)
    }

}
