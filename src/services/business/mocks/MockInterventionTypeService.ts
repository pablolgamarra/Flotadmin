import { InterventionType } from '@/models/InterventionType';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
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
                Observations: 'Se recomienda realizar cada 5000 km',
			},
			{
				Id: 2,
				Description: 'Revisión de Frenos',
                Observations: 'Se recomienda realizar cada 5000 km',
			},
			{
				Id: 3,
				Description: 'Cambio de Neumáticos',
                Observations: 'Se recomienda realizar cada 5000 km',
			},
			{
				Id: 4,
				Description: 'Inspección General',
                Observations: 'Se recomienda realizar cada 5000 km',
			},
			{
				Id: 5,
				Description: 'Reparación de Motor',
                Observations: 'Se recomienda realizar cada 5000 km',
			},
			{
				Id: 6,
				Description: 'Mantenimiento de Aire Acondicionado',
                Observations: 'Se recomienda realizar cada 5000 km',
			},
			{
				Id: 7,
				Description: 'Cambio de Batería',
                Observations: 'Se recomienda realizar cada 5000 km',
			},
			{
				Id: 8,
				Description: 'Alineación y Balanceo',
                Observations: 'Se recomienda realizar cada 5000 km',
			},
			{
				Id: 9,
				Description: 'Revisión del Sistema Eléctrico',
                Observations: 'Se recomienda realizar cada 5000 km',
			},
			{
				Id: 10,
				Description: 'Reemplazo de Filtros',
                Observations: 'Se recomienda realizar cada 5000 km',
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
    listAllPaged(arg0: number, arg1: number): Promise<{ interventionTypesPage: InterventionType[]; count: number; }> {
        throw new Error('Method not implemented.');
    }
	create(arg0: InterventionType): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	update(arg0: InterventionType): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
