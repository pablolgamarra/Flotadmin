import { useCallback, useEffect, useState } from 'react';

import { Intervention } from '@/models/Intervention';
import { IInterventionService } from '@/services/business/interfaces/IInterventionService';

export const useInterventionPagedList = (
	InterventionService: IInterventionService,
	pageSize: number = 20,
	requestedPage: number = 1,
) => {
	const [Interventions, setInterventions] = useState<Intervention[]>([] as Intervention[]);
    const [totalCount, setTotalCount] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const getInterventionsPage = useCallback(
		async (requestedPage: number) => {
            try {
                setIsLoading(true);

                const { interventionsPage, count } = await InterventionService.listAllPaged!(pageSize, requestedPage + 1);

                setInterventions(interventionsPage);
                setTotalCount(count);
			} catch (err: any) {
				setError(err.message || `Error loading page ${requestedPage} of Interventions list`);
			} finally {
				setIsLoading(false);
			}
		},
		[InterventionService, pageSize, requestedPage],
	);

	useEffect(() => {
		getInterventionsPage(requestedPage);
	}, [getInterventionsPage]);

	return { Interventions, /*currentPage,*/ totalCount, isLoading, error };
};
