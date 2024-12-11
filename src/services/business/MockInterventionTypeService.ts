import { InterventionType } from '@/models/InterventionType';
import { IInterventionTypeService } from './IInterventionTypeService';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';

export class MockInterventionTypeService implements IInterventionTypeService {
	public static readonly serviceKey: ServiceKey<IInterventionTypeService> = ServiceKey.create(
		'Flotadmin.MockInterventionTypeService',
		MockInterventionTypeService,
	);

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {});
	}
	delete(arg0: InterventionType): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	public async listAll(): Promise<InterventionType[]> {
		const interventionTypes: InterventionType[] = [
			{
				Id: 1,
				Description: 'Cambio de Aceite',
			},
			{
				Id: 2,
				Description: 'Revisión de Frenos',
			},
			{
				Id: 3,
				Description: 'Cambio de Neumáticos',
			},
			{
				Id: 4,
				Description: 'Inspección General',
			},
			{
				Id: 5,
				Description: 'Reparación de Motor',
			},
			{
				Id: 6,
				Description: 'Mantenimiento de Aire Acondicionado',
			},
			{
				Id: 7,
				Description: 'Cambio de Batería',
			},
			{
				Id: 8,
				Description: 'Alineación y Balanceo',
			},
			{
				Id: 9,
				Description: 'Revisión del Sistema Eléctrico',
			},
			{
				Id: 10,
				Description: 'Reemplazo de Filtros',
			},
		];

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(interventionTypes);
			}, 1000);
		});
	}
	listById(): Promise<InterventionType> {
		throw new Error('Method not implemented.');
	}
	create(arg0: InterventionType): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	update(arg0: InterventionType): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
