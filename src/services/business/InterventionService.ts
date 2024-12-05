import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { IInterventionService } from '@/services/business/IInterventionService';
import { ISPService } from '../core/spService/ISPService';
import { SPService } from '../core/spService/SPService';
import { Intervention } from '@/models/Intervention';
import { Vehicle } from '@/models/Vehicle';
import { InterventionType } from '@/models/InterventionType';
import { VehicleService } from './VehicleService';
import { IVehicleService } from './IVehicleService';
import { IInterventionTypeService } from './IInterventionTypeService';
import { InterventionTypeService } from './InterventionTypeService';
import { Currency } from '@/common/Currency';

export class InterventionService implements IInterventionService {
	public static readonly serviceKey: ServiceKey<IInterventionService> =
		ServiceKey.create('Flotadmin.InterventionService', InterventionService);

	private _SPService!: ISPService;
	private _VehicleService!: IVehicleService;
	private _InterventionTypeService!: IInterventionTypeService;

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			this._SPService = serviceScope.consume(SPService.servicekey);
			this._VehicleService = serviceScope.consume(
				VehicleService.serviceKey,
			);
			this._InterventionTypeService = serviceScope.consume(
				InterventionTypeService.serviceKey,
			);
		});
	}

	public async listAll(): Promise<Intervention[]> {
		const queryResults = await this._SPService.getListItems(
			'Intervenciones',
		);
		const vehicles = await this._VehicleService.listAll();
		const interventionTypes = await this._InterventionTypeService.listAll();

		const interventions = this.parseToIntervention(
			queryResults,
			vehicles,
			interventionTypes,
		);

		return interventions;
	}
	listById(): Promise<Intervention> {
		throw new Error('Method not implemented.');
	}
	create(arg0: Intervention): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	update(arg0: Intervention): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	private parseToIntervention(
		data: any[],
		vehicles: Vehicle[],
		interventionTypes: InterventionType[],
	): Intervention[] {
		return data.map((item) => {
			return {
				Id: item.Id,
				Vehicle: vehicles.find(
					(vehicle: Vehicle) => vehicle.Id === item.VehiculoId,
				)!,
				Kilometers: item.Title,
				Date: item.FechaIntervencion,
				IntervationType: interventionTypes.find(
					(type: InterventionType) =>
						type.Id === item.TipoIntervencionId,
				)!,
				Cost: item.CostoIntervencion,
				CostCurrency: item.MonedaIntervencion as Currency,
			};
		});
	}
}
