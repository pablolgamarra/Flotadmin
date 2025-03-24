import * as React from 'react';

import { FleetCardCard } from '@/controls/fleetCards/card/FleetCardCard';
import { useFleetCardPagedList } from '@/hooks/useFleetCardPagedList';
import { useVehicleList } from '@/hooks/useVehicleList';
import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import { Spinner } from '@fluentui/react-spinner';
import { useId } from '@fluentui/react-utilities';
import { Pagination } from '@pnp/spfx-controls-react';

export interface IFleetCardListPagedProps {
	fleetCardService: IFleetCardService;
	vehicleService: IVehicleService;
}

export const FleetCardListPaged: React.FC<IFleetCardListPagedProps> = (props) => {
	const id = useId('fleetCardPagedList');
	const pageSize = 9;
	const [page, setPage] = React.useState<number>(0);

	const { fleetCards, totalCount, isLoading, error } = useFleetCardPagedList(props.fleetCardService, pageSize, page);
	const { vehicleList } = useVehicleList(props.vehicleService);
	const totalPages = Math.ceil(totalCount / pageSize);

	if (isLoading) {
		return (
			<Spinner
				label='Cargando Tarjetas Flota...'
				size='tiny'
			/>
		);
	}

	if (error) {
		return <div>Error Listando Tarjetas Flota</div>;
	}

	return (
		<>
			<div
				id='cards-container'
				className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-px-4 tw-gap-4'
			>
				{fleetCards.map((item: FleetCard) => (
					<FleetCardCard
						key={`${id}-${item.CardNumber}`}
						fleetCard={item}
						linkedVehicle={vehicleList.find((v) => item.Id === v.FleetCard?.Id)}
						className='tw-w-fit hover:tw-shadow-sm tw-h-fit tw-rounded-lg tw-p-4 tw-bg-white tw-cursor-pointer'
					/>
				))}
			</div>
			<Pagination
				currentPage={page + 1}
				totalPages={totalPages}
				onChange={(page) => setPage(page - 1)}
				limiter={3}
				hideFirstPageJump
				hideLastPageJump
				limiterIcon={'Emoji12'}
			/>
		</>
	);
};
