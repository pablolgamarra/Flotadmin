export enum Currency {
	Dolar = 'Dolar',
	Guaranies = 'Guaranies',
}

export interface FleetCard {
	Id: number;
	CardNumber: string;
	AsignedValue: string;
}

export interface Vehicle {
	Id: number;
	Plate: string;
	Brand: string;
	Model: string;
	ModelYear: string;
	BuyDate: Date;
	Cost: number;
	CostCurrency: string;
	User: string;
	FleetCard: FleetCard;
}

export interface InterventionType {
	Id: number;
	Description: string;
}

export interface Intervention {
	Id: number;
	Kilometers: string;
	Vehicle: Vehicle;
	Date: Date;
	IntervationType: IntervationType;
	Cost: number;
	CostCurrency: Currency;
}
