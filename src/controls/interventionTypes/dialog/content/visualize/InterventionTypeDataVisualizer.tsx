import * as React from 'react';

import { InterventionType } from '@/models/InterventionType';

export interface IInterventionTypeDataVisualizerProps {
	interventionType?: InterventionType;
}

export const InterventionTypeDataVisualizer: React.FC<
	IInterventionTypeDataVisualizerProps
> = (props) => {
	const { interventionType } = props;

	return (
		<>
			<InterventionTypeDataVisualizer
				interventionType={interventionType}
			/>
		</>
	);
};
