import { Vehicle } from '@/models/Vehicle';

export interface IVehicleService {
	listAll(): Promise<Vehicle[]>;
	listById(arg0: number): Promise<Vehicle>;
    listAllPaged?(arg0: number/*, arg1: number*/): Promise<Array<Vehicle[]>>;
	create(arg0: Vehicle): Promise<boolean>;
	update(arg0: Vehicle): Promise<boolean>;
	delete(arg0: Vehicle): Promise<boolean>;
}
