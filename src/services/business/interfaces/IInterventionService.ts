import { Intervention } from '@/models/Intervention';

export interface IInterventionService {
	listAll(): Promise<Intervention[]>;
    listByVehicleId(arg0: number): Promise<Intervention[]>;
	listById(arg0: number): Promise<Intervention>;
    listAllPaged(arg0: number, arg1: number): Promise<{interventionsPage: Intervention[], count: number}>;
	create(arg0: Intervention): Promise<boolean>;
	update(arg0: Intervention): Promise<boolean>;
	delete(arg0: Intervention): Promise<boolean>;
}
