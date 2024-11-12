import * as React from 'react';

//Types
import { Vehicle } from '@vehiclesList/types';

//Components
import {
	Card,
	CardFooter,
	CardHeader,
	Body2,
	Button,
	Title3,
} from '@fluentui/react-components';
import { Open28Filled, WindowWrench28Regular } from '@fluentui/react-icons';

export interface VehicleCardProps {
	vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = (props) => {
	const { vehicle } = props;

	return (
		<Card size='medium'>
			<CardHeader
				header={
					<Title3>
						#{vehicle.Id} - {vehicle.Model} - {vehicle.Plate}
					</Title3>
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
				<b>Numero de Tarjeta Flota:</b> {vehicle.FleetCard.CardNumber}{' '}
			</Body2>
			<Body2>
				<b>Usuario:</b> {vehicle.User}
			</Body2>
			<CardFooter>
				<Button
					appearance='primary'
					icon={<Open28Filled />}
					iconPosition='before'
				>
					Editar
				</Button>
				<Button
					appearance='outline'
					icon={<WindowWrench28Regular />}
					iconPosition='before'
				>
					Registrar Interacción
				</Button>
			</CardFooter>
		</Card>
	);
};

export default VehicleCard;
