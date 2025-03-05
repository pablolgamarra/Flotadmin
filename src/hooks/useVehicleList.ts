import { Vehicle } from '@/models/Vehicle';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import { useCallback, useEffect, useState } from 'react';

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

export const useVehiclePagedList = (
  vehicleService: IVehicleService,
  pageSize: number = 20,
  requestedPage: number = 1,
  
) => {
  const [items, setItems] = useState<Vehicle[]>([] as Vehicle[]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(async (requestedPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const results = await vehicleService.listAllPaged!(pageSize);
      setItems(results[requestedPage - 1]);
    } catch (err: any) {
      setError(err.message || `Error loading page ${requestedPage} of vehicles list`);
    }
    setLoading(false);
  }, [vehicleService, pageSize, requestedPage]);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

   return { items, /*currentPage, totalCount,*/ loading, error, loadPage };
}
