import { useCallback, useEffect, useState } from 'react';

import { InterventionType } from '@/models/InterventionType';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';

export const useInterventionTypePagedList = (
    InterventionTypeService: IInterventionTypeService,
    pageSize: number = 20,
    requestedPage: number = 1,
) => {
    const [interventionTypes, setInterventionTypes] = useState<InterventionType[]>([] as InterventionType[]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getInterventionTypesPage = useCallback(
        async (requestedPage: number) => {
            try {
                setIsLoading(true);

                const { interventionTypesPage, count } = await InterventionTypeService.listAllPaged!(pageSize, requestedPage + 1);

                setInterventionTypes(interventionTypesPage);
                setTotalCount(count);
            } catch (err: any) {
                setError(err.message || `Error loading page ${requestedPage} of InterventionTypes list`);
            } finally {
                setIsLoading(false);
            }
        },
        [InterventionTypeService, pageSize, requestedPage],
    );

    useEffect(() => {
        getInterventionTypesPage(requestedPage);
    }, [getInterventionTypesPage]);

    return { interventionTypes, totalCount, isLoading, error };
};
