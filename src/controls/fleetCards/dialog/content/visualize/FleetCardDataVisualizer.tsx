import * as React from 'react';

import { FleetCard } from '@/models/FleetCard';
import { Vehicle } from '@/models/Vehicle';
import { FleetCardDataFields } from './FleetCardDataFields';

export interface FleetCardDataVisualizerProps {
	fleetCard?: FleetCard;
	linkedVehicle?: Vehicle | undefined;
}

export const FleetCardDataVisualizer: React.FC<FleetCardDataVisualizerProps> = (props) => {
	const { fleetCard, linkedVehicle } = props;

	return (
		<>
			<FleetCardDataFields
				fleetCard={fleetCard}
				linkedVehicle={linkedVehicle}
			/>
		</>
	);
};
