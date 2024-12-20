import * as React from 'react';

import { Currency } from '@/common/Currency';
import { moneyFormat } from '@/helpers/moneyFormat';
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
			onRender: (item: Intervention) => new Date(item.Date).toLocaleDateString('es-PY'),
		},
		{
			key: 'columnCost',
			name: 'Costo',
			fieldName: 'Cost',
			minWidth: 100,
			maxWidth: 150,
			isResizable: true,
			onRender: (item: Intervention) => {
				let formattedCost: string;
				switch (item.CostCurrency) {
					case Currency.Dolar:
						formattedCost = moneyFormat('en-US', item.Cost, 'USD');
						console.log(moneyFormat('en-US', item.Cost, 'USD'));
						break;
					case Currency.Guaranies:
						formattedCost = moneyFormat('es-PY', item.Cost, 'Gs');
						console.log(moneyFormat('es-PY', item.Cost, 'Gs'));
						break;
				}
				return formattedCost;
			},
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
