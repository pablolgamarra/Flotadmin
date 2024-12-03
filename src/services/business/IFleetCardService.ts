import { FleetCard } from '@/models/FleetCard';

export interface IFleetCardService {
	listAll(): Promise<FleetCard[]>;
	listById(): Promise<FleetCard>;
	create(arg0: FleetCard): Promise<boolean>;
	update(arg0: FleetCard): Promise<boolean>;
}
