import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { IFleetCardService } from '@/services/business/IFleetCardService';
import { ISPService } from '@/services/core/spService/ISPService';
import { SPService } from '@/services/core/spService/SPService';
import { FleetCard } from '@/models/FleetCard';

export class FleetCardService implements IFleetCardService {
	public static readonly serviceKey: ServiceKey<IFleetCardService> =
		ServiceKey.create('Flotadmin.FleetCardService', FleetCardService);

	private _SPService!: ISPService;

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			this._SPService = serviceScope.consume(SPService.servicekey);
		});
	}
	listById(): Promise<FleetCard> {
		throw new Error('Method not implemented.');
	}
	public async listAll(): Promise<FleetCard[]> {
		const queryResults = await this._SPService.getListItems(
			'TarjetasFlota',
		);

		const fleetCards = this.parseToFleetCard(queryResults);

		return fleetCards;
	}
	create(arg0: FleetCard): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	update(arg0: FleetCard): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	private parseToFleetCard(data: any[]): FleetCard[] {
		return data.map((item) => {
			return {
				Id: item.Id,
				CardNumber: item.Title,
				AssignedValue: item.MontoAsignado,
			};
		});
	}
}
