import * as React from 'react';

import { FleetCardDataFields } from './FleetCardDataFields';
import { FleetCard } from '@/models/FleetCard';

export interface FleetCardDataVisualizerProps {
	fleetCard?: FleetCard;
}

export const FleetCardDataVisualizer: React.FC<FleetCardDataVisualizerProps> = (
	props,
) => {
	const { fleetCard } = props;

	return (
		<>
			<FleetCardDataFields fleetCard={fleetCard} />
		</>
	);
};
