import { Currency } from '@/common/Currency';
import { Intervention } from '@/models/Intervention';
import { InterventionType } from '@/models/InterventionType';
import { Vehicle } from '@/models/Vehicle';
import { IInterventionService } from '@/services/business/interfaces/IInterventionService';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import { VehicleService } from '@/services/business/VehicleService';
import { ISPService } from '@/services/core/spService/ISPService';
import { SPService } from '@/services/core/spService/SPService';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { InterventionTypeService } from './InterventionTypeService';

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

			const interventions = this.parseToIntervention(results, interventionTypes, vehicles);

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

			const interventions = this.parseToIntervention(results, interventionTypes, vehicles);

			return interventions[0];
		} catch (e) {
			throw Error(`Error retrieving intervention data by Id -> ${e}`);
		}
	}

    public async listByVehicleId(vehicleId: number): Promise<Intervention[]> {
        try {
            const result = await this._SPService.getListItemsWithFilter('Intervenciones', `VehiculoId eq ${vehicleId}`);
			const interventionTypes = await this._InterventionTypeService.listAll();
            
            return this.parseToIntervention(result, interventionTypes);
        } catch (e) {
            throw new Error(`Error retrieving interventions for vehicle ${vehicleId}: ${e}`);
        }
    }

    public async listAllPaged(pageSize: number, requestedPage: number): Promise<{interventionsPage: Intervention[], count: number}> {
        try {
            const vehicles = await this._VehicleService.listAll();
			const interventionTypes = await this._InterventionTypeService.listAll();

            const { results, totalCount} = await this._SPService.getListItemsPaged('Vehiculos', pageSize, requestedPage);
            
            const interventions= await this.parseToIntervention(results, interventionTypes, vehicles);

			return {interventionsPage: interventions, count: totalCount};

        } catch (e) {
			throw Error(`Error retrieving interventionspaged from page ${requestedPage}-> ${e}`);
        }
    }

	public async create(arg0: Intervention): Promise<boolean> {
		try {
            let budgetList, invoiceList;
            //Insert the file in the document library if it exists
            if(arg0.Invoice){
                try{
                    await this._SPService.insertDocument!('FacturasIntervenciones', {Id: arg0.Id, file: arg0.Invoice});
                    invoiceList = await this._SPService.getListItems('FacturasIntervenciones');
                }catch(e){
                    throw Error(`Error saving invoice data -> ${e}`);
                }
            }

            if(arg0.Budget){
                try{
                    await this._SPService.insertDocument!('PresupuestosIntervenciones', {Id: arg0.Id, file: arg0.Budget});
                    budgetList = await this._SPService.getListItems('PresupuestosIntervenciones');
                }catch(e){
                    throw Error(`Error saving budget data -> ${e}`);
                }
            }
            
            //Prepare the data to be saved in the list
            const interventionInsert = this.formatPersistanceData(arg0, invoiceList, budgetList);
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
		interventionTypes: InterventionType[],
		vehicles?: Vehicle[],
	): Intervention[] {
		return data.map((item) => {
			return {
				Id: item.Id,
				Vehicle: vehicles ? vehicles.find((vehicle: Vehicle) => vehicle.Id === item.VehiculoId)! : item.VehiculoId,
				Kilometers: item.Title,
				Date: item.FechaIntervencion,
                Description: item.Descripcion,
				InterventionType: interventionTypes.find(
					(type: InterventionType) => type.Id === item.TipoIntervencionId,
				)!,
				Cost: item.CostoIntervencion,
				CostCurrency: item.MonedaIntervencion as Currency,
                NextMaintenanceKilometers: item.KmProxMantenimiento,
			};
		});
	}

	private formatPersistanceData(item: Intervention, invoiceList?: any[], budgetList?: any[]): any {
		return {
			Id: item.Id,
			VehiculoId: item.Vehicle?.Id,
			Title: item.Kilometers,
			FechaIntervencion: item.Date,
			TipoIntervencionId: item.InterventionType?.Id,
			CostoIntervencion: item.Cost,
            Descripcion: item.Description,
			MonedaIntervencion: item.CostCurrency,
            KmProxMantenimiento: item.NextMaintenanceKilometers,
            FacturasId: invoiceList ? invoiceList.filter((invoice) => invoice.Title === encodeURI(item.Invoice?.name || '')).map((item) => item.Id) : [],
            PresupuestosId: budgetList ? budgetList.filter((budget) => budget.Title === encodeURI(item.Budget?.name || '')).map((item) => item.Id) : [],
		};
	}
}
