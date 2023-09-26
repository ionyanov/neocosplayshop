import { Injectable } from '@nestjs/common';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { IDescriptionDto } from './description.dto';

@Injectable()
export class DescriptionService {
	constructor(private readonly prisma: PrismaService, private readonly logger: LogService) {
	}

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
		return [...result, ...this.getStaticDescription()];
	}
	async setDescription(idProd: number, data: IDescriptionDto) {
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

	getStaticDescription(): IDescriptionDto[] {
		const result: IDescriptionDto[] = [{
			id: -1,
			description: 'Please note, that this item is "MADE TO ORDER" and it will take some time to ship',
			type: 'CONCENTRATE'
		}, {
			id: -2,
			description: 'Shipping worldwide.Don\'t forget to write your address and name to our email Neocosplay1@gmail.com',
			type: 'CONCENTRATE'
		}, {
			id: -3,
			description: 'Item is made to order, so it can be slightly different from the provided pictures.I also can make props depending on your preferences!',
			type: 'CONCENTRATE'
		}, {
			id: -4,
			description: 'Please contact us if you have any questions:) or for more photo',
			type: 'CONCENTRATE'
		}, {
			id: -5,
			description: 'We do not claim any rights to this design.',
			type: 'CONCENTRATE'
		}]
		return result
	}
}
