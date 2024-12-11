import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { IVehicleService } from './IVehicleService';
import { Vehicle } from '@/models/Vehicle';
import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from './IFleetCardService';
import { MockFleetCardService } from './MockFleetCardService';

export class MockVehicleService implements IVehicleService {
	public static readonly serviceKey: ServiceKey<IVehicleService> = ServiceKey.create(
		'Flotadmin.MockVehicleService',
		MockVehicleService,
	);

	private _fleetCardService!: IFleetCardService;

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			this._fleetCardService = serviceScope.consume(MockFleetCardService.serviceKey);
		});
	}
	delete(arg0: Vehicle): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	public async listAll(): Promise<Vehicle[]> {
		const mockFleetCards: FleetCard[] = await this._fleetCardService.listAll();

		const vehicles: Vehicle[] = [
			{
				Id: 1,
				Plate: 'ABC-1234',
				Brand: 'Toyota',
				Model: 'Corolla',
				ModelYear: '2020',
				BuyDate: new Date('2020-05-15'),
				Cost: 15000,
				CostCurrency: 'USD',
				User: 'Juan Pérez',
				FleetCard: mockFleetCards.find((card) => card.Id === 1),
			},
			{
				Id: 2,
				Plate: 'XYZ-5678',
				Brand: 'Ford',
				Model: 'Focus',
				ModelYear: '2019',
				BuyDate: new Date('2019-03-10'),
				Cost: 13000,
				CostCurrency: 'USD',
				User: 'Ana López',
				FleetCard: mockFleetCards.find((card) => card.Id === 2),
			},
			{
				Id: 3,
				Plate: 'DEF-9012',
				Brand: 'Chevrolet',
				Model: 'Cruze',
				ModelYear: '2021',
				BuyDate: new Date('2021-07-20'),
				Cost: 17000,
				CostCurrency: 'USD',
				User: 'Carlos González',
				FleetCard: mockFleetCards.find((card) => card.Id === 3),
			},
			{
				Id: 4,
				Plate: 'GHI-3456',
				Brand: 'Honda',
				Model: 'Civic',
				ModelYear: '2018',
				BuyDate: new Date('2018-11-05'),
				Cost: 14000,
				CostCurrency: 'USD',
				User: 'María Fernández',
				FleetCard: mockFleetCards.find((card) => card.Id === 4),
			},
			{
				Id: 5,
				Plate: 'JKL-7890',
				Brand: 'Nissan',
				Model: 'Sentra',
				ModelYear: '2022',
				BuyDate: new Date('2022-01-10'),
				Cost: 18000,
				CostCurrency: 'USD',
				User: 'Sin Asignar',
				FleetCard: undefined, // Vehículo sin tarjeta asignada
			},
		];

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(vehicles);
			}, 1000);
		});
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
}
