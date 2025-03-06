import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { ISPService } from '@/services/core/spService/ISPService';
import { SPService } from '@/services/core/spService/SPService';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';

export class FleetCardService implements IFleetCardService {
	public static readonly serviceKey: ServiceKey<IFleetCardService> = ServiceKey.create(
		'Flotadmin.FleetCardService',
		FleetCardService,
	);

	private _SPService!: ISPService;

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
			});
		} catch (e) {
			throw new Error(`Error initializing FleetCardService -> ${e}`);
		}
	}

	public async listAll(filter?: string): Promise<FleetCard[]> {
		try {
			let queryResults;

			if (filter) {
				queryResults = await this._SPService.getListItemsWithFilter('TarjetasFlota', filter);
				const fleetCards = this.parseToFleetCard(queryResults);
				return fleetCards;
			}

			queryResults = await this._SPService.getListItems('TarjetasFlota');
			const fleetCards = this.parseToFleetCard(queryResults);
			return fleetCards;
		} catch (e) {
			throw Error(`Error retrieving fleet cards data -> ${e}`);
		}
	}

	public async listById(id: number): Promise<FleetCard> {
		try {
			const queryResults = await this._SPService.getListItem('TarjetasFlota', id);
			const fleetCards = this.parseToFleetCard(queryResults);
			return fleetCards[0];
		} catch (e) {
			throw Error(`Error retrieving fleet cards data -> ${e}`);
		}
	}

    public async listAllPaged(pageSize: number, requestedPage: number): Promise<{fleetCardsPage: FleetCard[], count: number}> {
        try {
            const { results, totalCount} = await this._SPService.getListItemsPaged('TarjetasFlota', pageSize, requestedPage);
            const fleetCards = this.parseToFleetCard(results);

            return {fleetCardsPage: fleetCards, count: totalCount};

        } catch (e) {
            throw Error(`Error retrieving vehicles paged from page ${requestedPage}-> ${e}`);
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
				IsActive: item.Activo,
			};
		});
	}

	private formatPersistanceData(item: FleetCard) {
		return {
			Id: item.Id,
			Title: item.CardNumber,
			MontoAsignado: item.AssignedValue,
			Activo: item.IsActive,
		};
	}
}
