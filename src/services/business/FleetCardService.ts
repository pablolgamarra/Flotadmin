import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { IFleetCardService } from '@/services/business/IFleetCardService';
import { ISPService } from '@/services/core/spService/ISPService';
import { SPService } from '@/services/core/spService/SPService';
import { FleetCard } from '@/models/FleetCard';

export class FleetCardService implements IFleetCardService {
	public static readonly serviceKey: ServiceKey<IFleetCardService> = ServiceKey.create(
		'Flotadmin.FleetCardService',
		FleetCardService,
	);

	private _SPService!: ISPService;

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			this._SPService = serviceScope.consume(SPService.servicekey);
		});
	}

	public async listAll(): Promise<FleetCard[]> {
		try {
			const queryResults = await this._SPService.getListItems('TarjetasFlota');

			const fleetCards = this.parseToFleetCard(queryResults);

			return fleetCards;
		} catch (e) {
			throw Error(`Error retrieving fleet cards data -> ${e}`);
		}
	}

	public async listById(arg0: number): Promise<FleetCard> {
		try {
			const queryResults = await this._SPService.getListItem('TarjetasFlota', arg0);

			const fleetCards = this.parseToFleetCard(queryResults);

			return fleetCards[0];
		} catch (e) {
			throw Error(`Error retrieving fleet cards data -> ${e}`);
		}
	}

	public async create(arg0: FleetCard): Promise<boolean> {
		try {
			const fleetCardInsert = this.formatPersistanceData(arg0);
			await this._SPService.insertItem('TarjetasFlota', fleetCardInsert);
			return true;
		} catch (e) {
			throw Error(`Error inserting fleet card data ${e}`);
		}
	}

	public async update(arg0: FleetCard): Promise<boolean> {
		try {
			const fleetCardUpdate = this.formatPersistanceData(arg0);
			await this._SPService.updateItem('TarjetasFlota', fleetCardUpdate);
			return true;
		} catch (e) {
			throw Error(`Error inserting fleet card data ${e}`);
		}
	}

	public async delete(arg0: FleetCard): Promise<boolean> {
		try {
			const fleetCardDelete = this.formatPersistanceData(arg0);
			await this._SPService.deleteItem('TarjetasFlota', fleetCardDelete.Id);
			return true;
		} catch (e) {
			throw Error(`Error inserting fleet card data ${e}`);
		}
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

	private formatPersistanceData(item: FleetCard) {
		return {
			Id: item.Id,
			Title: item.CardNumber,
			MontoAsignado: item.AssignedValue,
		};
	}
}
