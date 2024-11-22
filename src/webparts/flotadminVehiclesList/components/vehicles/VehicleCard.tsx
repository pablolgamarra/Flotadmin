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

//Styles
import '../../../../../assets/dist/tailwind.css';
import { InteractionDialog } from '../interactions/InteractionDialog';

export interface VehicleCardProps {
	vehicle: Vehicle;
	className: string;
}

const VehicleCard: React.FC<VehicleCardProps> = (props) => {
	const { vehicle, className } = props;

	const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

	return (
		<Card
			className={className}
			size='medium'
		>
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
				className='tw-mb-4'
			/>
			<Body2>
				<b>Monto de Flota Asignado:</b>{' '}
				{vehicle.FleetCard.AssignedValue} Gs
			</Body2>
			<Body2>
				<b>Numero de Tarjeta Flota:</b> {vehicle.FleetCard.CardNumber}{' '}
			</Body2>
			<Body2>
				<b>Usuario:</b> {vehicle.User}
			</Body2>
			<CardFooter className='tw-mt-8'>
				<Button
					appearance='primary'
					icon={<Open28Filled />}
					iconPosition='before'
				>
					Ver
				</Button>
				<InteractionDialog
					open={dialogOpen}
					setOpen={setDialogOpen}
					triggerButton={
						<Button
							appearance='outline'
							icon={<WindowWrench28Regular />}
							iconPosition='before'
							onClick={() => setDialogOpen(!dialogOpen)}
						>
							Registrar Interacción
						</Button>
					}
				/>
			</CardFooter>
		</Card>
	);
};

export default VehicleCard;
