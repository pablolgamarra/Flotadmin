import { Intervention } from '@/models/Intervention';
import { IInterventionService } from '@/services/business/interfaces/IInterventionService';
import { useEffect, useState } from 'react';

export const useInterventionList = (interventionListService: IInterventionService, vehicleId?: number) => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [interventionList, setInterventionList] = useState<Intervention[]>([]);

	useEffect(() => {
		const getInterventions = async (): Promise<void> => {
			try {
				setLoading(true);

				const interventions: Intervention[] = await interventionListService.listAll();
                
				if (vehicleId) {
					const filteredInterventions = interventions.filter((intervention:Intervention) => intervention.Vehicle.Id === vehicleId);
					setInterventionList(filteredInterventions);
				} else {
					setInterventionList(interventions);
				}
			} catch (e) {
				setError(`Error listando intervenciones ${e}`);
			} finally {
				setLoading(false);
			}
		};

		getInterventions();
	}, []);

	return { isLoading, error, interventionList };
};
