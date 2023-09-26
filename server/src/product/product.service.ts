import { Injectable } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService, private readonly logger: LogService, private readonly imgservice: ImagesService) {
	}

	async getProducts(condition) {
		const result = await this.prisma.product.findMany({
			select: this.resultProductFields(),
			where: condition
		});
		return result;
	}


	async getProduct(id: number) {
		const result = await this.prisma.product.findFirst({
			select: {
				...this.resultProductFields(),
				mainImageId: true
			},
			where: {
				id: id
			}
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
				},
				update: {
					price: data.price,
					name: data.name,
					categoryId: data.category.id,
					isOnsales: data.isOnsales,
					isPopular: data.isPopular,
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
		let result
		try {
			const resultImg = await this.prisma.productImage.findMany({
				select: {
					id: true
				},
				where: {
					productId: id
				}
			});
			resultImg.map(img => this.imgservice.delImages(id, img.id));
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
			mainImage: {
				select: {
					id: true,
					link: true,
					description: true
				}
			},
			isOnsales: true,
			isPopular: true,
		}
	}
}
