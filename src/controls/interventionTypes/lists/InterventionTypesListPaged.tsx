import * as React from 'react';

import { useInterventionTypesPagedList } from '@/hooks/useInterventionTypesListPaged';
import { InterventionType } from '@/models/InterventionType';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
import { Spinner } from '@fluentui/react-spinner';
import { useId } from '@fluentui/react-utilities';
import { Pagination } from '@pnp/spfx-controls-react';
import { InterventionTypeCard } from '../card/InterventionTypesCard';

export interface IInterventionTypesListPaged {
	interventionTypesService: IInterventionTypeService;
}

export const InterventionTypesListPaged: React.FC<IInterventionTypesListPaged> = (props) => {
	const id = useId('fleetCardPagedList');
	const pageSize = 9;
	const [page, setPage] = React.useState<number>(0);

	const { interventionTypes, totalCount, isLoading, error } = useInterventionTypesPagedList(
		props.interventionTypesService,
		pageSize,
		page,
	);
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
		return <div>Error Listando Tipos de Intervencion</div>;
	}

	return (
		<>
			<div
				id='cards-container'
				className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-px-4 tw-gap-4'
			>
				{interventionTypes.map((item: InterventionType) => (
					<InterventionTypeCard
						key={`${id}-${item.Id}`}
						interventionType={item}
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
