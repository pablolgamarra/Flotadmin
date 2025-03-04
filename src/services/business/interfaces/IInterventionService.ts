import { Intervention } from '@/models/Intervention';

export interface IInterventionService {
	listAll(): Promise<Intervention[]>;
    listByVehicleId(arg0: number): Promise<Intervention[]>;
	listById(arg0: number): Promise<Intervention>;
	create(arg0: Intervention): Promise<boolean>;
	update(arg0: Intervention): Promise<boolean>;
	delete(arg0: Intervention): Promise<boolean>;
}
