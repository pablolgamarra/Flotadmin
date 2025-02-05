import { FleetCard } from '@/models/FleetCard';
import { Field, Input } from '@fluentui/react-components';
import * as React from 'react';
export interface FleetCardDataFieldsProps {
	fleetCard?: FleetCard;
}

export const FleetCardDataFields: React.FC<FleetCardDataFieldsProps> = (props) => {
	const { fleetCard } = props;

	return (
		<>
			<Field label={'Número de Tarjeta'}>
				<Input value={fleetCard?.CardNumber} />
			</Field>
			<Field label={'Monto Asignado'}>
				<Input value={fleetCard?.AssignedValue.toString()} />
			</Field>
		</>
	);
};
