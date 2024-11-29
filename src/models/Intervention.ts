import { Currency } from '@/common/Currency';
import { Vehicle } from '@/models/Vehicle';
import { InterventionType } from '@/models/InterventionType';

export interface Intervention {
	Id: number;
	Kilometers: string;
	Vehicle: Vehicle;
	Date: Date;
	IntervationType: InterventionType;
	Cost: number;
	CostCurrency: Currency;
}
