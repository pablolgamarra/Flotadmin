import { useCallback, useEffect, useState } from 'react';

import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';

export const useFleetCardPagedList = (
    FleetCardService: IFleetCardService,
    pageSize: number = 20,
    requestedPage: number = 1,
) => {
    const [FleetCards, setFleetCards] = useState<FleetCard[]>([] as FleetCard[]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getFleetCardsPage = useCallback(
        async (requestedPage: number) => {
            try {
                setIsLoading(true);

                const { fleetCardsPage, count } = await FleetCardService.listAllPaged!(pageSize, requestedPage + 1);

                setFleetCards(fleetCardsPage);
                setTotalCount(count);
            } catch (err: any) {
                setError(err.message || `Error loading page ${requestedPage} of FleetCards list`);
            } finally {
                setIsLoading(false);
            }
        },
        [FleetCardService, pageSize, requestedPage],
    );

    useEffect(() => {
        getFleetCardsPage(requestedPage);
    }, [getFleetCardsPage]);

    return { FleetCards, totalCount, isLoading, error };
};
