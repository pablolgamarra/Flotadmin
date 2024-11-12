import * as React from 'react';

import { Vehicle } from '@vehiclesList/types';

import {
	Card,
	CardFooter,
	CardPreview,
	CardHeader,
	Body1Strong,
	Body2,
} from '@fluentui/react-components';

export interface VehicleCardProps {
	vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = (props) => {
	const { vehicle } = props;

	return (
		<Card>
			<CardHeader
				header={
					<Body1Strong>
						#{vehicle.Id} - {vehicle.Model} - {vehicle.Plate}
					</Body1Strong>
				}
				description={
					//TODO: Agregar campo calculado de ultimo mantenimiento a la DB
					<Body2>
						{/* Km Ultimo Mantenimiento: {Vehicle.} */}
						Km Último Mantenimiento: 10.000 Km
					</Body2>
				}
			/>
			<Body2>
				<b>Monto de Flota Asignado:</b> {vehicle.FleetCard.AsignedValue}{' '}
				Gs
			</Body2>
			<Body2>
				<b>Monto de Flota Asignado:</b> {vehicle.FleetCard.CardNumber}
			</Body2>
			<Body2>
				<b>Usuario:</b> {vehicle.User} Gs
			</Body2>
		</Card>
	);
};
