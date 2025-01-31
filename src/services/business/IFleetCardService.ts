import { FleetCard } from '@/models/FleetCard';

export interface IFleetCardService {
	listAll(): Promise<FleetCard[]>;
	listById(arg0: number): Promise<FleetCard>;
	create(arg0: FleetCard): Promise<boolean>;
	update(arg0: FleetCard): Promise<boolean>;
	delete(arg0: FleetCard): Promise<boolean>;
}
