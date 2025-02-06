import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from '@/services/business/IFleetCardService';
import { useEffect, useState } from 'react';

export const useFleetCardList = (
	fleetCardService: IFleetCardService,
    onlyNonUsed?: boolean
): { isLoading: boolean; error: string | undefined; fleetCardList: FleetCard[] } => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [fleetCardList, setFleetCardList] = useState<FleetCard[]>([]);

	useEffect(() => {
		const getFleetCardsList = async (): Promise<void> => {
			try {
				setLoading(true);

                if(onlyNonUsed){
                    const fleetCardList = await fleetCardService.listAll(`Activo eq true`);
                    setFleetCardList(fleetCardList);
                }else{
                    const fleetCardList = await fleetCardService.listAll(`Activo eq true`);
                    setFleetCardList(fleetCardList);
                }


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
