import { Injectable } from '@nestjs/common';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { IProdPropertiesDto } from './prodproperties.dto';

@Injectable()
export class ProdPropertiesService {
	constructor(private readonly prisma: PrismaService, private readonly logger: LogService) {
	}

	async getProperties(idProd: number) {
		const result = await this.prisma.productProperties.findMany({
			select: {
				id: true,
				propertyId: true,
				property: {
					select: {
						...this.prisma.getBaseField(),
						isList: true
					}
				},
				value: true,
				valueId: true,
				propertyValues: {
					select: {
						value: true
					}
				}
			},
			where: {
				productId: idProd
			},
			orderBy: {
				property: {
					order: 'asc'
				},
			}
		});
		return result;
	}
	async setProperties(idProd: number, data: IProdPropertiesDto) {
		let result = {}
		try {
			result = await this.prisma.productProperties.upsert({
				create: {
					productId: idProd,
					propertyId: data.propertyId,
					value: data.value,
					valueId: data.valueId == 0 ? undefined : data.valueId
				},
				update: {
					value: data.value,
					valueId: data.valueId == 0 ? undefined : data.valueId
				},
				where: {
					id: data.id,
					productId: idProd,
				}
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error update description');
		}
		return result;
	}
	async delProperties(idProd: number, idProp: number) {
		let result = {}
		try {
			result = await this.prisma.productProperties.deleteMany({

				where: {
					id: idProp,
					productId: idProd,
				}
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error delete property values');
		}
		return result;
	}
	async getCategoryProperties(idProd: number) {
		let result = {}
		const product = await this.prisma.product.findUnique({
			select: {
				categoryId: true,
			},
			where: {
				id: idProd
			}
		});
		if (product.categoryId)
			result = await this.prisma.property.findMany({
				select: {
					id: true,
					name: true,
					isList: true,
					values: {
						select: {
							id: true,
							value: true
						},
						where: {
							isActive: true
						},
						orderBy: {
							value: 'asc'
						}
					}
				},
				where: {
					categories: {
						some: {
							categoryId: product.categoryId
						}
					}
				},
				orderBy: {
					order: 'asc'
				}
			});
		return result;
	}
}
