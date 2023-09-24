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
		return result;
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
}
