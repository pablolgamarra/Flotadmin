import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { IInterventionTypeService } from '@/services/business/IInterventionTypeService';
import { ISPService } from '@/services/core/spService/ISPService';
import { SPService } from '@/services/core/spService/SPService';
import { InterventionType } from '@/models/InterventionType';

export class InterventionTypeService implements IInterventionTypeService {
	public static readonly serviceKey: ServiceKey<IInterventionTypeService> =
		ServiceKey.create(
			'Flotadmin.InterventionTypeService',
			InterventionTypeService,
		);

	private _SPService!: ISPService;

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			this._SPService = serviceScope.consume(SPService.servicekey);
		});
	}
	listById(): Promise<any> {
		throw new Error('Method not implemented.');
	}

	public async listAll(): Promise<InterventionType[]> {
		const queryResults = await this._SPService.getListItems(
			'TiposIntervencion',
		);

		const interventionTypes = this.parseToInterventionType(queryResults);

		return interventionTypes;
	}
	public async create(arg0: object): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	public async update(arg0: object): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	private parseToInterventionType(data: any[]): InterventionType[] {
		return data.map((item) => {
			return {
				Id: item.Id,
				Description: item.Title,
			};
		});
	}
}
