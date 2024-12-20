import { Currency } from '@/common/Currency';
import { Intervention } from '@/models/Intervention';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { IInterventionService } from './IInterventionService';
import { IInterventionTypeService } from './IInterventionTypeService';
import { IVehicleService } from './IVehicleService';
import { MockInterventionTypeService } from './MockInterventionTypeService';
import { MockVehicleService } from './MockVehicleService';

export class MockInterventionService implements IInterventionService {
	public static readonly serviceKey: ServiceKey<IInterventionService> = ServiceKey.create(
		'Flotadmin.MockInterventionService',
		MockInterventionService,
	);

	private _interventionTypeService!: IInterventionTypeService;
	private _vehicleService!: IVehicleService;

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			this._interventionTypeService = serviceScope.consume(MockInterventionTypeService.serviceKey);
			this._vehicleService = serviceScope.consume(MockVehicleService.serviceKey);
		});
	}
	delete(arg0: Intervention): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	public async listAll(): Promise<Intervention[]> {
		const vehicles = await this._vehicleService.listAll();
		const interventionTypes = await this._interventionTypeService.listAll();

		const interventions = [
			{
				Id: 1,
				Kilometers: '25000',
				Vehicle: vehicles[0],
				Date: new Date('2023-08-15'),
				IntervationType: interventionTypes[0],
				Cost: 150,
				CostCurrency: Currency.Dolar,
			},
			{
				Id: 2,
				Kilometers: '50000',
				Vehicle: vehicles[2],
				Date: new Date('2023-09-10'),
				IntervationType: interventionTypes[2],
				Cost: 300,
				CostCurrency: Currency.Dolar,
			},
			{
				Id: 3,
				Kilometers: '75000',
				Vehicle: vehicles[4],
				Date: new Date('2023-10-05'),
				IntervationType: interventionTypes[1],
				Cost: 450,
				CostCurrency: Currency.Dolar,
			},
		];

		return new Promise((resolve) => {
			setTimeout(() => resolve(interventions), 1100);
		});
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
}
