import { useEffect, useState } from 'react';
import { IFleetCardService } from '@/services/business/IFleetCardService';
import { FleetCard } from '@/models/FleetCard';

export const useFleetCardList = (
	fleetCardService: IFleetCardService,
): { isLoading: boolean; error: string | undefined; fleetCardList: FleetCard[] } => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [fleetCardList, setFleetCardList] = useState<FleetCard[]>([]);

	useEffect(() => {
		const getFleetCardsList = async (): Promise<void> => {
			try {
				setLoading(true);

				const fleetCardList = await fleetCardService.listAll();
				setFleetCardList(fleetCardList);

				setError(undefined);
			} catch (e) {
				setError(`Error fetching fleet cards list -> ${e}`);
			} finally {
				setLoading(false);
			}
		};

		getFleetCardsList();
	}, [setFleetCardList]);

	return { isLoading, error, fleetCardList };
};
