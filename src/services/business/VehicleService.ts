import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { IVehicleService } from './IVehicleService';
import { ISPService } from '@/services/core/spService/ISPService';
import { SPService } from '@/services/core/spService/SPService';
import { Vehicle } from '@/models/Vehicle';
import { FleetCard } from '@/models/FleetCard';
import { FleetCardService } from './FleetCardService';
import { IFleetCardService } from './IFleetCardService';

export class VehicleService implements IVehicleService {
	public static readonly serviceKey: ServiceKey<IVehicleService> =
		ServiceKey.create('Flotadmin.VehicleService', VehicleService);

	private _SPService!: ISPService;
	private _fleetCardService!: IFleetCardService;
	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			this._SPService = serviceScope.consume(SPService.servicekey);
			this._fleetCardService = new FleetCardService(serviceScope);
		});
	}

	public async listAll(): Promise<Vehicle[]> {
		const queryResults = await this._SPService.getListItems('Vehiculos');
		const fleetCards = await this._fleetCardService.listAll();

		const vehicles = this.parseToVehicle(queryResults, fleetCards);

		return vehicles;
	}
	listById(): Promise<Vehicle> {
		throw new Error('Method not implemented.');
	}
	create(arg0: Vehicle): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	update(arg0: Vehicle): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	public parseToVehicle(data: any[], fleetCards: FleetCard[]): Vehicle[] {
		return data.map((item) => {
			return {
				Id: item.Id,
				Plate: item.Title,
				Brand: item.Marca,
				Model: item.Modelo,
				ModelYear: item.AnhoModelo,
				BuyDate: item.FechaAdquisicion,
				Cost: item.CostoAdquisicion,
				CostCurrency: item.MonedaAdquisicion,
				User: item.Usuario,
				FleetCard: fleetCards.find(
					(card) => card.Id === item.TarjetaFlotaId,
				),
			};
		});
	}
}
