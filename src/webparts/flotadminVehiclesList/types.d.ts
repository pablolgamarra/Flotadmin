export enum Currency {
	Dolar = 'Dolar',
	Guaranies = 'Guaranies',
}

export interface FleetCard {
	Id: number;
	CardNumber: string;
	AssignedValue: number;
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
	FleetCard?: FleetCard;
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

export interface VehiclesResponse {
	Id: number;
	Title: string;
	Marca: string;
	Modelo: string;
	AnhoModelo: string;
	FechaAdquisicion: Date;
	CostoAdquisicion: number;
	MonedaAdquisicion: string;
	Usuario: string;
	TarjetaFlotaId: number;
	ID: number;
	Modified: Date;
	Created: Date;
	AuthorId: number;
	EditorId: number;
}

export interface InterventionTypesResponse {
	Id: number;
	Title: string;
	ID: number;
	Modified: Date;
	Created: Date;
	AuthorId: number;
	EditorId: number;
}

export interface FleetCardsResponse {
	Id: number;
	Title: string;
	MontoAsignado: number;
	ID: number;
	Modified: Date;
	Created: Date;
	AuthorId: number;
	EditorId: number;
}

export interface InterventionsResponse {
	Id: number;
	Title: string;
	VehiculoId: number;
	FechaIntervencion: Date;
	TipoIntervencionId: number;
	CostoIntervencion: number;
	MonedaIntervencion: string;
	Descripcion: string;
}
