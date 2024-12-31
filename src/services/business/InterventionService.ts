import { Currency } from '@/common/Currency';
import { Intervention } from '@/models/Intervention';
import { InterventionType } from '@/models/InterventionType';
import { Vehicle } from '@/models/Vehicle';
import { IInterventionService } from '@/services/business/IInterventionService';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { ISPService } from '../core/spService/ISPService';
import { SPService } from '../core/spService/SPService';
import { IInterventionTypeService } from './IInterventionTypeService';
import { InterventionTypeService } from './InterventionTypeService';
import { IVehicleService } from './IVehicleService';
import { VehicleService } from './VehicleService';

export class InterventionService implements IInterventionService {
	public static readonly serviceKey: ServiceKey<IInterventionService> = ServiceKey.create(
		'Flotadmin.InterventionService',
		InterventionService,
	);

	private _SPService!: ISPService;
	private _VehicleService!: IVehicleService;
	private _InterventionTypeService!: IInterventionTypeService;

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
				this._VehicleService = serviceScope.consume(VehicleService.serviceKey);
				this._InterventionTypeService = serviceScope.consume(InterventionTypeService.serviceKey);
			});
		} catch (e) {
			throw new Error(`Error initializing InterventionService -> ${e}`);
		}
	}

	public async listAll(): Promise<Intervention[]> {
		try {
			const vehicles = await this._VehicleService.listAll();
			const interventionTypes = await this._InterventionTypeService.listAll();

			const results = await this._SPService.getListItems('Intervenciones');

			const interventions = this.parseToIntervention(results, vehicles, interventionTypes);

			return interventions;
		} catch (e) {
			throw Error(`Error retrieving interventions data -> ${e}`);
		}
	}

	public async listById(arg0: number): Promise<Intervention> {
		try {
			const vehicles = await this._VehicleService.listAll();
			const interventionTypes = await this._SPService.getListItems('TiposIntervencion');

			const results = await this._SPService.getListItems('Intervenciones');

			const interventions = this.parseToIntervention(results, vehicles, interventionTypes);

			return interventions[0];
		} catch (e) {
			throw Error(`Error retrieving intervention data by Id -> ${e}`);
		}
	}
	public async create(arg0: Intervention): Promise<boolean> {
		try {
			const interventionInsert = this.formatPersistanceData(arg0);

			await this._SPService.insertItem('Intervenciones', interventionInsert);

			return true;
		} catch (e) {
			throw Error(`Error saving interventions data -> ${e}`);
		}
	}
	public async update(arg0: Intervention): Promise<boolean> {
		try {
			const interventionUpdate = this.formatPersistanceData(arg0);

			await this._SPService.updateItem('Intervenciones', interventionUpdate);

			return true;
		} catch (e) {
			throw Error(`Error updating interventions data -> ${e}`);
		}
	}
	public async delete(arg0: Intervention): Promise<boolean> {
		try {
			const interventionDelete = this.formatPersistanceData(arg0);

			await this._SPService.deleteItem('Intervenciones', interventionDelete.Id);

			return true;
		} catch (e) {
			throw Error(`Error updating interventions data -> ${e}`);
		}
	}

	private parseToIntervention(
		data: any[],
		vehicles: Vehicle[],
		interventionTypes: InterventionType[],
	): Intervention[] {
		return data.map((item) => {
			return {
				Id: item.Id,
				Vehicle: vehicles.find((vehicle: Vehicle) => vehicle.Id === item.VehiculoId)!,
				Kilometers: item.Title,
				Date: item.FechaIntervencion,
				IntervationType: interventionTypes.find(
					(type: InterventionType) => type.Id === item.TipoIntervencionId,
				)!,
				Cost: item.CostoIntervencion,
				CostCurrency: item.MonedaIntervencion as Currency,
			};
		});
	}

	private formatPersistanceData(item: Intervention) {
		return {
			Id: item.Id,
			VehiculoId: item.Vehicle?.Id,
			Title: item.Kilometers,
			FechaIntervencion: item.Date,
			TipoIntervencionId: item.IntervationType,
			CostoIntervencion: item.Cost,
			MonedaIntervencion: item.CostCurrency,
		};
	}
}
