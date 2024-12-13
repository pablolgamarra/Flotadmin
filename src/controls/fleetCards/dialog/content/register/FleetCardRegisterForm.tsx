import * as React from 'react';

import { FleetCard } from '@/models/FleetCard';
import { Field, Input } from '@fluentui/react-components';

export interface FleetCardDataFormProps {
	fleetCard?: FleetCard;
}

export const FleetCardRegisterForm: React.FC<FleetCardDataFormProps> = (props) => {
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
