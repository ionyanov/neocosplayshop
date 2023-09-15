import { Injectable } from '@nestjs/common';
import { PropertyDto, ValuesDto } from './properties.dto';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { async } from 'rxjs';

@Injectable()
export class PropertiesService {
	constructor(private readonly prisma: PrismaService, private readonly logger: LogService) {
	}

	async getAll(onlyActive: boolean) {
		const data = await this.prisma.property.findMany({
			orderBy: {
				name: 'asc'
			},
			include: {
				values: {
					select: {
						id: true,
						value: true,
						isActive: true
					},
					where: {
						isActive: onlyActive ? true : undefined
					},
					orderBy: {
						value: 'asc'
					}
				}
			}
		})
		return data;
	}

	async upsert(data: PropertyDto) {
		let settings = {}
		try {
			settings = await this.prisma.property.upsert({
				create: {
					name: data.name ?? 'NAME',
					isList: data.isList ?? false
				},
				update: {
					...data
				},
				where: {
					id: data.id
				}
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Error getting settings');
		}
		return settings;
	}

	async setValue(propId: number, data: ValuesDto) {
		await this.prisma.propertyValues.upsert({
			where: { id: data.id },
			create: {
				value: data.value,
				isActive: data.isActive,
				propertyId: propId
			},
			update: {
				...data,
				propertyId: propId
			},
		})
		return 'success';
	}

	async deleteValue(propId: number, valId: number) {
		await this.prisma.propertyValues.deleteMany({
			where: {
				propertyId: propId,
				id: valId
			}
		});
		return 'success';
	}
}
