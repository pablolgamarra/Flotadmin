import { Currency } from '@/common/Currency';
import { InterventionType } from '@/models/InterventionType';
import { Vehicle } from '@/models/Vehicle';

export interface Intervention {
	Id: number;
	Kilometers: string;
	Vehicle: Vehicle;
	Date: Date;
	IntervationType: InterventionType;
	Cost: number;
	CostCurrency: Currency;
}
