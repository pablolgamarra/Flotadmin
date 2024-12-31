import { Currency } from '@/common/Currency';
import { FleetCard } from '@/models/FleetCard';

export interface Vehicle {
	Id: number;
	Plate: string;
	Brand: string;
	Model: string;
	ModelYear: string;
	BuyDate: Date;
	Cost: number;
	CostCurrency: Currency;
	User: string;
	FleetCard?: FleetCard;
}
