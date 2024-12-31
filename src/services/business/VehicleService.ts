import { Currency } from '@/common/Currency';
import { FleetCard } from '@/models/FleetCard';
import { Vehicle } from '@/models/Vehicle';
import { ISPService } from '@/services/core/spService/ISPService';
import { SPService } from '@/services/core/spService/SPService';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { FleetCardService } from './FleetCardService';
import { IFleetCardService } from './IFleetCardService';
import { IVehicleService } from './IVehicleService';

export class VehicleService implements IVehicleService {
	public static readonly serviceKey: ServiceKey<IVehicleService> = ServiceKey.create(
		'Flotadmin.VehicleService',
		VehicleService,
	);

	private _SPService!: ISPService;
	private _fleetCardService!: IFleetCardService;
	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
				this._fleetCardService = serviceScope.consume(FleetCardService.serviceKey);
			});
		} catch (e) {
			throw new Error(`Error initializing VehicleService -> ${e}`);
		}
	}

	public async listAll(): Promise<Vehicle[]> {
		try {
			const queryResults = await this._SPService.getListItems('Vehiculos');
			const fleetCards = await this._fleetCardService.listAll();

			const vehicles = this.parseToVehicle(queryResults, fleetCards);

			return vehicles;
		} catch (e) {
			throw new Error(`Error retrieving vehicles: ${e}`);
		}
	}

	public async listById(arg0: number): Promise<Vehicle> {
		try {
			const fleetCards = await this._fleetCardService.listAll();
			const result = await this._SPService.getListItem('Vehiculos', arg0);
			const vehicle = this.parseToVehicle(result, fleetCards);

			return vehicle[0];
		} catch (e) {
			throw Error(`Error retrieving vehicles by Id -> ${e}`);
		}
	}

	public async create(arg0: Vehicle): Promise<boolean> {
		try {
			const vehicleInsert = this.formatPersistanceProps(arg0);

			await this._SPService.insertItem('Vehiculos', vehicleInsert);
			return true;
		} catch (e) {
			throw Error(`Error inserting data of vehicle to server -> ${e}`);
		}
	}

	public async update(arg0: Vehicle): Promise<boolean> {
		try {
			const vehicleUpdate = this.formatPersistanceProps(arg0);

			await this._SPService.updateItem('Vehiculos', vehicleUpdate);
			return true;
		} catch (e) {
			throw Error(`Error updating vehicles data -> ${e}`);
		}
	}

	public async delete(arg0: Vehicle): Promise<boolean> {
		try {
			const vehicleDelete = this.formatPersistanceProps(arg0);

			await this._SPService.deleteItem('Vehiculos', vehicleDelete.Id);
			return true;
		} catch (e) {
			throw Error(`Error deleting vehicle -> ${e}`);
		}
	}

	private parseToVehicle(data: any[], fleetCards: FleetCard[]): Vehicle[] {
		return data.map((item) => {
			return {
				Id: item.Id,
				Plate: item.Title,
				Brand: item.Marca,
				Model: item.Modelo,
				ModelYear: item.AnhoModelo,
				BuyDate: item.FechaAdquisicion,
				Cost: item.CostoAdquisicion,
				CostCurrency: item.MonedaAquisicion as Currency,
				User: item.Usuario,
				FleetCard: fleetCards.find((card) => card.Id === item.TarjetaFlotaId),
			};
		});
	}

	private formatPersistanceProps(item: Vehicle) {
		return {
			Id: item.Id,
			Title: item.Plate,
			Marca: item.Brand,
			Modelo: item.Model,
			AnhoModelo: item.ModelYear,
			FechaAdquisicion: item.BuyDate,
			CostoAdquisicion: item.Cost,
			MonedaAquisicion: item.CostCurrency,
			Usuario: item.User,
			TarjetaFlotaId: item.FleetCard?.Id,
		};
	}
}
