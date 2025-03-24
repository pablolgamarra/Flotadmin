import * as React from 'react';

import { FleetCardCard } from '@/controls/fleetCards/card/FleetCardCard';
import { useFleetCardList } from '@/hooks/useFleetCardList';
import { useVehicleList } from '@/hooks/useVehicleList';
import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import { Spinner } from '@fluentui/react-spinner';
import { useId } from '@fluentui/react-utilities';

export interface IFleetCardListProps {
	fleetCardService: IFleetCardService;
	vehicleService: IVehicleService;
}

export const FleetCardList: React.FC<IFleetCardListProps> = (props) => {
	const id = useId('fleetCardList');
	const { fleetCardList, isLoading } = useFleetCardList(props.fleetCardService);
	const { vehicleList } = useVehicleList(props.vehicleService);

	if (isLoading) {
		return (
			<Spinner
				label='Cargando Vehiculos Registrados'
				size='tiny'
			/>
		);
	}

	return (
		<div
			id='cards-container'
			className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-px-4 tw-gap-4'
		>
			{fleetCardList.map((item: FleetCard) => (
				<FleetCardCard
					key={`${id}-${item.CardNumber}`}
					fleetCard={item}
					linkedVehicle={vehicleList.find((v) => item.Id === v.FleetCard?.Id)}
					className='tw-w-fit hover:tw-shadow-sm tw-h-fit tw-rounded-lg tw-p-4 tw-bg-white tw-cursor-pointer'
				/>
			))}
		</div>
	);
};
