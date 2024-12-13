import { FleetCard } from '@/models/FleetCard';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { IFleetCardService } from './IFleetCardService';

export class MockFleetCardService implements IFleetCardService {
	public static readonly serviceKey: ServiceKey<IFleetCardService> = ServiceKey.create(
		'Flotadmin.MockFleetCardService',
		MockFleetCardService,
	);

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {});
	}
	delete(arg0: FleetCard): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	public async listAll(): Promise<FleetCard[]> {
		const fleetCards: FleetCard[] = [
			{
				Id: 1,
				CardNumber: '1597538426',
				AssignedValue: 3000000,
			},
			{
				Id: 2,
				CardNumber: '1597538426',
				AssignedValue: 6000000,
			},
			{
				Id: 3,
				CardNumber: '1597586426',
				AssignedValue: 7500000,
			},
			{
				Id: 4,
				CardNumber: '9457538426',
				AssignedValue: 8000000,
			},
		];

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(fleetCards);
			}, 1100);
		});
	}
	listById(): Promise<FleetCard> {
		throw new Error('Method not implemented.');
	}
	create(arg0: FleetCard): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	update(arg0: FleetCard): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
