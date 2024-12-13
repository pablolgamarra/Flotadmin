import * as React from 'react';

import { FleetCard } from '@/models/FleetCard';
import { FleetCardDataFields } from './FleetCardDataFields';

export interface FleetCardDataVisualizerProps {
	fleetCard?: FleetCard;
}

export const FleetCardDataVisualizer: React.FC<FleetCardDataVisualizerProps> = (props) => {
	const { fleetCard } = props;

	return (
		<>
			<FleetCardDataFields fleetCard={fleetCard} />
		</>
	);
};
