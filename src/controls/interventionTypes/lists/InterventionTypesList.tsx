import * as React from 'react';

import { useInterventionTypesList } from '@/hooks/useInterventionTypesList';
import { InterventionType } from '@/models/InterventionType';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
import { useId } from '@fluentui/react-utilities';
import { InterventionTypeCard } from '../card/InterventionTypesCard';

export interface IInterventionTypesList {
	interventionTypesService: IInterventionTypeService;
}

export const InterventionTypesList: React.FC<IInterventionTypesList> = (props) => {
	const id = useId('interventionTypesList');
	const { interventionTypesList } = useInterventionTypesList(props.interventionTypesService);

	return (
		<div
			id='cards-container'
			className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-px-4 tw-gap-4'
		>
			{interventionTypesList.map((item: InterventionType) => (
				<InterventionTypeCard
					key={`${id}-${item.Id}`}
					interventionType={item}
					className='tw-w-fit hover:tw-shadow-sm tw-h-fit'
				/>
			))}
		</div>
	);
};
