import { InterventionType } from '@/models/InterventionType';

export interface IInterventionTypeService {
	listAll(): Promise<InterventionType[]>;
	listById(arg0: number): Promise<InterventionType>;
	create(arg0: InterventionType): Promise<boolean>;
	update(arg0: InterventionType): Promise<boolean>;
	delete(arg0: InterventionType): Promise<boolean>;
}
