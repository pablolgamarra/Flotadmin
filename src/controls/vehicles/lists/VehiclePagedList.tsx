import * as React from 'react';

import VehicleCard from '@/controls/vehicles/card/VehicleCard';
import { useVehiclePagedList } from '@/hooks/useVehiclePagedList';
import { Vehicle } from '@/models/Vehicle';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import { Spinner, useId } from '@fluentui/react-components';
import { Pagination } from '@pnp/spfx-controls-react';

export interface VehiclePagedListProps {
	vehicleService: IVehicleService;
}

export const VehiclePagedList: React.FC<VehiclePagedListProps> = (props) => {
	const id = useId('vehiclePagedList');
	const pageSize = 9;
	const [page, setPage] = React.useState<number>(0);

	const { vehicles, totalCount, isLoading, error } = useVehiclePagedList(props.vehicleService, pageSize, page);
	const totalPages = Math.ceil(totalCount / pageSize);

	if (isLoading) {
		return (
			<Spinner
				label='Cargando Vehiculos Registrados'
				size='tiny'
			/>
		);
	}

	if (error) {
		return <div>Error Listando Vehiculos</div>;
	}

	return (
		<>
			<div
				id='cards-container'
				className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-gap-4'
			>
				{vehicles.map((item: Vehicle) => (
					<VehicleCard
						key={`${id}-${item.Plate}`}
						vehicle={item}
						className='tw-w-fit hover:tw-shadow-sm tw-h-fit'
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
