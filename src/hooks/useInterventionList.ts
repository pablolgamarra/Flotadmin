import { Intervention } from '@/models/Intervention';
import { InterventionService } from '@/services/business/InterventionService';
import { useEffect, useState } from 'react';

export const useInterventionList = (interventionListService: InterventionService) => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [interventionList, setInterventionList] = useState<Intervention[]>([]);

	useEffect(() => {
		const getInterventions = async (): Promise<void> => {
			try {
				setLoading(true);
				const interventions = await interventionListService.listAll();

				setInterventionList(interventions);
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
