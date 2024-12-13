import * as React from 'react';

import { Intervention } from '@/models/Intervention';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react';

export interface VehicleDataInteractionsProps {
	interactions: Intervention[];
}

export const VehicleDataInteractions: React.FC<VehicleDataInteractionsProps> = (props) => {
	const { interactions } = props;

	const columns: IColumn[] = [
		{
			key: 'columnDate',
			name: 'Fecha',
			fieldName: 'Date',
			minWidth: 100,
			maxWidth: 150,
			isResizable: true,
			onRender: (item: Intervention) => new Date(item.Date).toLocaleDateString('es-ES'),
		},
		{
			key: 'columnCost',
			name: 'Costo',
			fieldName: 'Cost',
			minWidth: 100,
			maxWidth: 150,
			isResizable: true,
			onRender: (item: Intervention) => `${item.Cost.toLocaleString('es-ES')} ${item.CostCurrency}`,
		},
		{
			key: 'columnInterventionType',
			name: 'Tipo de Intervención',
			fieldName: 'InterventionType',
			minWidth: 150,
			maxWidth: 200,
			isResizable: true,
			onRender: (item: Intervention) => item.IntervationType.Description,
		},
	];

	return (
		<DetailsList
			items={interactions}
			columns={columns}
			selectionMode={SelectionMode.none}
			layoutMode={DetailsListLayoutMode.justified}
			isHeaderVisible={true}
			styles={{
				root: {
					overflowX: 'auto',
				},
			}}
		/>
	);
};
