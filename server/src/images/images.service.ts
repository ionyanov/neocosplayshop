import { Injectable } from '@nestjs/common';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { IImagesDto } from './images.dto';

@Injectable()
export class ImagesService {
	constructor(private readonly prisma: PrismaService, private readonly logger: LogService) {
	}

	async addImages(prodId: number, files: Array<Express.Multer.File>) {
		let result;
		try {
			files.map(async file => {
				result = await this.prisma.productImage.create({
					data: {
						link: file.filename,
						productId: prodId,
						description: '',
					}
				});
			})
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error upload file');
		}
		return result;
	}

	async getImages(prodId: number) {
		const result = await this.prisma.productImage.findMany({
			select: {
				id: true,
				description: true,
				link: true,
			},
			where: {
				productId: prodId
			}
		});
		return result;
	}

	async setImages(prodId: number, data: IImagesDto) {
		let result;
		try {
			result = await this.prisma.productImage.updateMany({
				data: {
					description: data.description,
				},
				where: {
					id: data.id,
					productId: prodId
				}
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error upload file');
		}
		return result;
	}

	async delImages(prodId: number, imgId: number) {
		var fs = require('fs');
		var path = require('path');
		let result;
		try {
			result = await this.prisma.productImage.findFirst({
				where: {
					id: imgId,
					productId: prodId
				}
			});
			if (result) {
				const file = path.resolve(__dirname, process.env.UPLOAD_DIR, result.link)
				if (fs.existsSync(file))
					fs.unlinkSync(file);
				result = await this.prisma.productImage.deleteMany({
					where: {
						id: imgId,
						productId: prodId
					}
				});
			}
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error upload file');
		}
		return result;
	}

	async setMain(prodId: number, imgId: number) {
		let result;
		try {
			result = await this.prisma.product.updateMany({
				data: {
					mainImage: imgId,
				},
				where: {
					id: prodId
				}
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error set main');
		}
		return result;
	}
}