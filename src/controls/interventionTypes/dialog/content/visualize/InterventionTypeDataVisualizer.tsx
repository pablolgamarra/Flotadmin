import * as React from 'react';

import { InterventionType } from '@/models/InterventionType';
import { InterventionTypeDataFields } from './InterventionTypeDataFields';

export interface InterventionTypeDataVisualizerProps {
	interventionType?: InterventionType;
}

export const InterventionTypeDataVisualizer: React.FC<
	InterventionTypeDataVisualizerProps
> = (props) => {
	const { interventionType } = props;

	return (
		<>
			<InterventionTypeDataFields interventionType={interventionType} />
		</>
	);
};
