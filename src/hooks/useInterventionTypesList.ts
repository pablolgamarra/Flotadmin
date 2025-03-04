import { useEffect, useState } from 'react';

import { InterventionType } from '@/models/InterventionType';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';

export const useInterventionTypesList = (interventionTypeService: IInterventionTypeService) => {
	const [interventionTypesList, setInterventionTypesList] = useState<InterventionType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		const getInterventionTypes = async () => {
			try {
				setIsLoading(true);
				const interventionTypes = await interventionTypeService.listAll();
				setInterventionTypesList(interventionTypes);
				setError(undefined);
			} catch (e) {
				setError(`Error fetching intervention types list -> ${e}`);
			} finally {
				setIsLoading(false);
			}
		};

		getInterventionTypes();
	}, [setInterventionTypesList]);

	return { interventionTypesList, isLoading, error };
};
