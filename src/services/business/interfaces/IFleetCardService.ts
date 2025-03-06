import { FleetCard } from '@/models/FleetCard';

export interface IFleetCardService {
	listAll(arg0?:string): Promise<FleetCard[]>;
	listById(arg0: number): Promise<FleetCard>;
    listAllPaged(arg0: number, arg1: number): Promise<{fleetCardsPage: FleetCard[], count: number}>;
	create(arg0: FleetCard): Promise<boolean>;
	update(arg0: FleetCard): Promise<boolean>;
	delete(arg0: FleetCard): Promise<boolean>;
}
