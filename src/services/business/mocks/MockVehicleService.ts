import { Currency } from '@/common/Currency';
import { FleetCard } from '@/models/FleetCard';
import { Vehicle } from '@/models/Vehicle';
import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
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
                CostCurrency: Currency.Dolar,
                User: 'Juan Pérez',
                FleetCard: mockFleetCards.find((card) => card.Id === 1),
                InsuranceExpirationDate: new Date('2025-05-15'),
                VehicleLicenseExpirationDate: new Date('2024-12-31'),
                DinatranExpirationDate: new Date('2024-06-30'),
                InsuratedValue: 12000,
                InsuratedValueCurrency: Currency.Dolar,
                FireExtinguisherExpirationDate: new Date('2026-05-15'),
                IsActive: true,
            },
            {
                Id: 2,
                Plate: 'XYZ-5678',
                Brand: 'Ford',
                Model: 'Focus',
                ModelYear: '2019',
                BuyDate: new Date('2019-03-10'),
                Cost: 13000,
                CostCurrency: Currency.Dolar,
                User: 'Ana López',
                FleetCard: mockFleetCards.find((card) => card.Id === 2),
                InsuranceExpirationDate: new Date('2024-03-10'),
                VehicleLicenseExpirationDate: new Date('2024-09-30'),
                DinatranExpirationDate: new Date('2024-07-15'),
                InsuratedValue: 11000,
                InsuratedValueCurrency: Currency.Dolar,
                FireExtinguisherExpirationDate: new Date('2025-03-10'),
                IsActive: true,
            },
            {
                Id: 3,
                Plate: 'DEF-9012',
                Brand: 'Chevrolet',
                Model: 'Cruze',
                ModelYear: '2021',
                BuyDate: new Date('2021-07-20'),
                Cost: 17000,
                CostCurrency: Currency.Dolar,
                User: 'Carlos González',
                FleetCard: mockFleetCards.find((card) => card.Id === 3),
                InsuranceExpirationDate: new Date('2026-07-20'),
                VehicleLicenseExpirationDate: new Date('2024-10-31'),
                DinatranExpirationDate: new Date('2025-01-20'),
                InsuratedValue: 15000,
                InsuratedValueCurrency: Currency.Dolar,
                FireExtinguisherExpirationDate: new Date('2027-07-20'),
                IsActive: true,
            },
            {
                Id: 4,
                Plate: 'GHI-3456',
                Brand: 'Honda',
                Model: 'Civic',
                ModelYear: '2018',
                BuyDate: new Date('2018-11-05'),
                Cost: 14000,
                CostCurrency: Currency.Dolar,
                User: 'María Fernández',
                FleetCard: mockFleetCards.find((card) => card.Id === 4),
                InsuranceExpirationDate: new Date('2023-11-05'),
                VehicleLicenseExpirationDate: new Date('2024-08-31'),
                DinatranExpirationDate: new Date('2024-11-30'),
                InsuratedValue: 10000,
                InsuratedValueCurrency: Currency.Dolar,
                FireExtinguisherExpirationDate: new Date('2025-11-05'),
                IsActive: true,
            },
            {
                Id: 5,
                Plate: 'JKL-7890',
                Brand: 'Nissan',
                Model: 'Sentra',
                ModelYear: '2022',
                BuyDate: new Date('2022-01-10'),
                Cost: 18000,
                CostCurrency: Currency.Dolar,
                User: 'Sin Asignar',
                FleetCard: undefined, // Vehículo sin tarjeta asignada
                InsuranceExpirationDate: new Date('2026-01-10'),
                VehicleLicenseExpirationDate: new Date('2025-01-31'),
                DinatranExpirationDate: new Date('2025-06-15'),
                InsuratedValue: 16000,
                InsuratedValueCurrency: Currency.Dolar,
                FireExtinguisherExpirationDate: new Date('2027-01-10'),
                IsActive: true,
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
    listAllPaged(arg0: number, arg1: number): Promise<{ vehiclesPage: Vehicle[]; count: number; }> {
        throw new Error('Method not implemented.');
    }
	create(arg0: Vehicle): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	update(arg0: Vehicle): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
