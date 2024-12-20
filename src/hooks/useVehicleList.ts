import { Vehicle } from '@/models/Vehicle';
import { IVehicleService } from '@/services/business/IVehicleService';
import { useEffect, useState } from 'react';

export const useVehicleList = (vehicleService: IVehicleService) => {
	const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
	const [error, setError] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getVehicles = async () => {
			try {
				setIsLoading(true);
				const vehicles = await vehicleService.listAll();

				setVehicleList(vehicles);

				setError(undefined);
			} catch (e) {
				setError(`Error fetching vehicles list -> ${e}`);
			} finally {
				setIsLoading(false);
			}
		};

		getVehicles();
	}, [setVehicleList]);

	return { vehicleList, error, isLoading };
};
