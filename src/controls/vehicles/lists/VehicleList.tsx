import * as React from 'react';

import VehicleCard from '@/controls/vehicles/card/VehicleCard';
import { useVehicleList } from '@/hooks/useVehicleList';
import { Vehicle } from '@/models/Vehicle';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import { Spinner, useId } from '@fluentui/react-components';

export interface VehiclePagedListProps {
	vehicleService: IVehicleService;
}

export const VehiclePagedList: React.FC<VehiclePagedListProps> = (props) => {
	const id = useId('vehiclePagedList');
	const { vehicleList, isLoading } = useVehicleList(props.vehicleService);

	if (isLoading) {
		return (
			<Spinner
				label='Cargando Vehiculos Registrados'
				size='tiny'
			/>
		);
	}

	return (
		<>
			<div
				id='cards-container'
				className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-gap-4'
			>
				{isLoading ? (
					<Spinner
						label='Cargando Vehiculos Registrados'
						size='tiny'
					/>
				) : (
					vehicleList.map((item: Vehicle) => (
						<VehicleCard
							key={`${id}-${item.Plate}`}
							vehicle={item}
							className='tw-w-fit hover:tw-shadow-sm tw-h-fit'
						/>
					))
				)}
			</div>
		</>
	);
};
