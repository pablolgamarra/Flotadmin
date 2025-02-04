import { Currency } from '@/common/Currency';
import { InterventionType } from '@/models/InterventionType';
import { Vehicle } from '@/models/Vehicle';

export interface Intervention {
	Id: number;
	Kilometers: string;
    NextMaintenanceKilometers: string;
	Vehicle: Vehicle;
	Date: Date;
	InterventionType?: InterventionType;
    Description:string;
	Cost: number;
	CostCurrency: Currency;
    Invoice?: File;
    Budget?: File;
}
