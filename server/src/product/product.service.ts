import { Injectable } from '@nestjs/common';
import { ProductDescriptionDto, ProductDto, ProductPropertiesDto } from './product.dto';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { query } from 'express';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService, private readonly logger: LogService) {
	}

	async getProducts(condition) {
		const result = await this.prisma.product.findMany({
			select: this.resultProductFields(),
			where: condition
		});
		return result;
	}
	async setProduct(data: ProductDto) {
		let result = {}
		try {
			result = await this.prisma.product.upsert({
				create: {
					price: data.price,
					name: data.name,
					categoryId: data.category.id,
					isOnsales: data.isOnsales,
					isPopular: data.isPopular,
					mainImage: 0,
				},
				update: {
					price: data.price,
					name: data.name,
					categoryId: data.category.id,
					isOnsales: data.isOnsales,
					isPopular: data.isPopular,
					mainImage: 0,
				},
				where: {
					id: data.id
				}
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error update product');
		}
		return result;
	}
	async delProduct(id: number) {
		let result = {}
		try {
			result = await this.prisma.product.deleteMany({
				where: {
					id: id
				}
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error delete product');
		}
		return result;
	}
	private resultProductFields() {
		return {
			id: true,
			name: true,
			price: true,
			category: {
				select: this.prisma.getBaseField()
			},
			isOnsales: true,
			isPopular: true,
		}
	}

	/** Description */
	async getDescription(idProd: number) {
		const result = await this.prisma.productDescription.findMany({
			select: {
				id: true,
				type: true,
				description: true
			},
			where: {
				productId: idProd
			}
		});
		return result;
	}
	async setDescription(idProd: number, data: ProductDescriptionDto) {
		let result = {}
		try {
			result = await this.prisma.productDescription.upsert({
				create: {
					type: data.type,
					description: data.description,
					productId: idProd,
				},
				update: {
					type: data.type,
					description: data.description,
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
	async delDescription(idProd: number, idDescr: number) {
		let result = {}
		try {
			result = await this.prisma.productDescription.deleteMany({

				where: {
					id: idDescr,
					productId: idProd,
				}
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error delete description');
		}
		return result;
	}

	/** Properties */
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
	async setProperties(idProd: number, data: ProductPropertiesDto) {
		let result = {}
		try {
			result = await this.prisma.productProperties.upsert({
				create: {
					productId: idProd,
					propertyId: data.propertyId,
					value: data.value,
					valueId: data.valueId
				},
				update: {
					value: data.value,
					valueId: data.valueId
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
