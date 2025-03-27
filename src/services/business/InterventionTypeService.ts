import { InterventionType } from '@/models/InterventionType';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
import { ISPService } from '@/services/core/spService/ISPService';
import { SPService } from '@/services/core/spService/SPService';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';

export class InterventionTypeService implements IInterventionTypeService {
	public static readonly serviceKey: ServiceKey<IInterventionTypeService> = ServiceKey.create(
		'Flotadmin.InterventionTypeService',
		InterventionTypeService,
	);

	private _SPService!: ISPService;

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
			});
		} catch (e) {
			throw new Error(`Error initializing InterventionTypeService -> ${e}`);
		}
	}

	public async listAll(): Promise<InterventionType[]> {
		try {
			const queryResults = await this._SPService.getListItems('TiposIntervencion');

			const interventionTypes = this.parseToInterventionType(queryResults);

			return interventionTypes;
		} catch (e) {
			throw Error(`Error retrieving intervention types data -> ${e}`);
		}
	}

	public async listById(arg0: number): Promise<InterventionType> {
		try {
			const queryResults = await this._SPService.getListItem('TiposIntervencion', arg0);

			const interventionTypes = this.parseToInterventionType(queryResults);

			return interventionTypes[0];
		} catch (e) {
			throw Error(`Error retrieving intervention types data -> ${e}`);
		}
	}

    public async listAllPaged(pageSize: number, requestedPage: number): Promise<{interventionTypesPage: InterventionType[], count: number}> {
        try {
            const { results, totalCount} = await this._SPService.getListItemsPaged('TiposIntervencion', pageSize, requestedPage);
			const interventionTypes = this.parseToInterventionType(results);

            return {interventionTypesPage: interventionTypes, count: totalCount};

        } catch (e) {
            throw Error(`Error retrieving intervention types paged from page ${requestedPage}-> ${e}`);
        }
    }

	public async create(arg0: InterventionType): Promise<boolean> {
		try {
			const interventionTypeInsert = this.formatPersistanceData(arg0);

			await this._SPService.insertItem('TiposIntervencion', interventionTypeInsert);

			return true;
		} catch (e) {
			throw Error(`Error creating intervention types data -> ${e}`);
		}
	}

	public async update(arg0: InterventionType): Promise<boolean> {
		try {
			const interventionTypeUpdate = this.formatPersistanceData(arg0);

			await this._SPService.updateItem('TiposIntervencion', interventionTypeUpdate);

			return true;
		} catch (e) {
			throw Error(`Error creating intervention types data -> ${e}`);
		}
	}

	public async delete(arg0: InterventionType): Promise<boolean> {
		try {
			const interventionTypeDelete = this.formatPersistanceData(arg0);

			await this._SPService.deleteItem('TiposIntervencion', interventionTypeDelete.Id);

			return true;
		} catch (e) {
			throw Error(`Error creating intervention types data -> ${e}`);
		}
	}

	private parseToInterventionType(data: any[]): InterventionType[] {
		return data.map((item) => {
			return {
				Id: item.Id,
				Description: item.Title,
			};
		});
	}

	private formatPersistanceData(item: InterventionType) {
		return {
			Id: item.Id,
			Title: item.Description,
		};
	}
}
