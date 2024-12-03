import { Intervention } from '@/models/Intervention';

export interface IInterventionService {
	listAll(): Promise<Intervention[]>;
	listById(): Promise<Intervention>;
	create(arg0: Intervention): Promise<boolean>;
	update(arg0: Intervention): Promise<boolean>;
}
