import { Currency } from '@/common/Currency';
import { FleetCard } from '@/models/FleetCard';
import { Intervention } from './Intervention';

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
    InsuranceExpirationDate: Date;
    VehicleLicenseExpirationDate: Date;
    DinatranExpirationDate: Date;
    InsuratedValue: number;
    InsuratedValueCurrency: Currency;
    FireExtinguisherExpirationDate: Date;
    Interventions?: Intervention[];
    IsActive:boolean;
}
