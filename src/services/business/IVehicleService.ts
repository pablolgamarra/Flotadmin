import { Vehicle } from '@/models/Vehicle';

export interface IVehicleService {
	listAll(): Promise<Vehicle[]>;
	listById(arg0: number): Promise<Vehicle>;
	create(arg0: Vehicle): Promise<boolean>;
	update(arg0: Vehicle): Promise<boolean>;
	delete(arg0: Vehicle): Promise<boolean>;
}
