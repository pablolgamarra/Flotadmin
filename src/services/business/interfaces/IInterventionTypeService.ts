import { InterventionType } from '@/models/InterventionType';

export interface IInterventionTypeService {
	listAll(): Promise<InterventionType[]>;
	listById(arg0: number): Promise<InterventionType>;
    listAllPaged(arg0: number, arg1: number): Promise<{interventionTypesPage: InterventionType[], count: number}>;
	create(arg0: InterventionType): Promise<boolean>;
	update(arg0: InterventionType): Promise<boolean>;
	delete(arg0: InterventionType): Promise<boolean>;
}
