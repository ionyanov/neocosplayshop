import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { LogService } from "../log.service";
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService, private readonly logger: LogService) {
    }

    async getMenu() {
        let result = {}
        try {
            result = await this.prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                    link: true
                },
                where: {
                    visible: true
                },
                orderBy: {
                    order: 'asc'
                }
            });
        }
        catch (e) {
            await this.logger.LogMessage(e, 'Error getting menu');
        }
        return result;
    }

    async getAll() {
        let result = {}
        try {
            result = await this.prisma.category.findMany({
                orderBy: {
                    order: 'asc'
                },
                include: {
                    properties: {
                        select: {
                            property: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        },
                        orderBy: {
                            property: {
                                name: 'asc'
                            }
                        }
                    }
                }
            });
        }
        catch (e) {
            await this.logger.LogMessage(e, 'Error getting menu');
        }
        return result;
    }

    async upsert(categoryDto: CategoryDto) {
        let settings = {}
        try {
            settings = await this.prisma.category.upsert({
                create: {
                    name: categoryDto.name,
                    link: categoryDto.link,
                    order: categoryDto.order,
                    visible: categoryDto.visible
                },
                update: {
                    name: categoryDto.name,
                    link: categoryDto.link,
                    order: categoryDto.order,
                    visible: categoryDto.visible
                },
                where: {
                    id: categoryDto.id
                }
            });
        }
        catch (e) {
            await this.logger.LogMessage(e, 'Error getting settings');
        }
        return settings;
    }

    async remove(id: number) {
        let result = {}
        try {
            result = await this.prisma.category.deleteMany({
                where: {
                    id: id
                }
            });
        }
        catch (e) {
            await this.logger.LogMessage(e, 'Error deleting settings');
        }
        return result;
    }

    async removeProperties(catId: number, propId: number) {
        let result = {}
        try {
            result = await this.prisma.categoryProperties.deleteMany({
                where: {
                    categoryId: catId,
                    propertyId: propId
                }
            });
        }
        catch (e) {
            await this.logger.LogMessage(e, 'Error deleting link');
        }
        return result;
    }

    async addProperties(catId: number, propId: number) {
        let result = {}
        try {
            result = await this.prisma.categoryProperties.create(
                {
                    data: {
                        categoryId: catId,
                        propertyId: propId
                    }
                }
            );
        }
        catch (e) {
            await this.logger.LogMessage(e, 'Error added link');
        }
        return result;
    }
}
