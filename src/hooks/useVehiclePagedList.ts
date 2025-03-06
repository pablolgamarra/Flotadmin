import { useCallback, useEffect, useState } from 'react';

import { Vehicle } from '@/models/Vehicle';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';

export const useVehiclePagedList = (
	vehicleService: IVehicleService,
	pageSize: number = 20,
	requestedPage: number = 1,
) => {
	const [vehicles, setVehicles] = useState<Vehicle[]>([] as Vehicle[]);
    const [totalCount, setTotalCount] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const getVehiclesPage = useCallback(
		async (requestedPage: number) => {
            try {
                setIsLoading(true);

                const { vehiclesPage, count } = await vehicleService.listAllPaged!(pageSize, requestedPage + 1);

                setVehicles(vehiclesPage);
                setTotalCount(count);
			} catch (err: any) {
				setError(err.message || `Error loading page ${requestedPage} of vehicles list`);
			} finally {
				setIsLoading(false);
			}
		},
		[vehicleService, pageSize, requestedPage],
	);

	useEffect(() => {
		getVehiclesPage(requestedPage);
	}, [getVehiclesPage]);

	return { vehicles, /*currentPage,*/ totalCount, isLoading, error };
};
