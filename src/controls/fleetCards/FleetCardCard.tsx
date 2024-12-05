import * as React from 'react';

import {
	Card,
	CardHeader,
	CardFooter,
	Title3,
	Body2,
} from '@fluentui/react-components';

import { FleetCard } from '@/models/FleetCard';

export interface FleetCardCardProps {
	fleetCard: FleetCard;
	className: string;
}

export const FleetCardCard: React.FC<FleetCardCardProps> = (props) => {
	const { fleetCard, className } = props;

	return (
		<Card
			className={className}
			size='medium'
		>
			<CardHeader
				header={
					<Title3>
						#{fleetCard.Id} - {fleetCard.CardNumber}
					</Title3>
				}
				className='tw-mb-4'
			/>
			<Body2>
				<b>Monto de Asignado:</b> {fleetCard.AssignedValue} Gs
			</Body2>
			<CardFooter className='tw-mt-8'>
				<VehicleDialog
					title={`#${vehicle.Id} - ${vehicle.Model} ${vehicle.Plate}`}
					mode={DialogMode.Show}
					open={vehicleDialogOpen}
					setOpen={setVehicleDialogOpen}
					triggerButton={
						<Button
							appearance='primary'
							icon={<Open28Filled />}
							iconPosition='before'
							onClick={() => {
								setVehicleDialogOpen(!vehicleDialogOpen);
							}}
						>
							Ver
						</Button>
					}
					vehicle={vehicle}
				/>
				<InteractionDialog
					open={interactionDialogOpen}
					setOpen={setInteractionDialogOpen}
					triggerButton={
						<Button
							appearance='outline'
							icon={<WindowWrench28Regular />}
							iconPosition='before'
							onClick={() =>
								setInteractionDialogOpen(!interactionDialogOpen)
							}
						>
							Registrar Interacción
						</Button>
					}
				/>
			</CardFooter>
		</Card>
	);
};
