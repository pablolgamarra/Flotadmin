import * as React from 'react';

//Types
import { Vehicle } from '@/models/Vehicle';

//Components
import { Body2, Button, Card, CardFooter, CardHeader, Title3 } from '@fluentui/react-components';
import { Dismiss24Regular, Edit24Regular, Open28Filled, WindowWrench28Regular } from '@fluentui/react-icons';

//Styles
import { DialogMode } from '@/common/DialogMode';
import { InteractionDialog } from '@/controls/interactions/InteractionDialog';
import { VehicleDialog } from '@/controls/vehicles/dialog/VehicleDialog';
import { dateFormat } from '@/helpers/dateFormat';
import { moneyFormat } from '@/helpers/moneyFormat';
import { Intervention } from '@/models/Intervention';
import '../../../../assets/dist/tailwind.css';

export interface VehicleCardProps {
	vehicle: Vehicle;
	className: string;
}

const VehicleCard: React.FC<VehicleCardProps> = (props) => {
	const { vehicle, className } = props;

	const [interactionDialogOpen, setInteractionDialogOpen] = React.useState<boolean>(false);

	const [vehicleDialogOpen, setVehicleDialogOpen] = React.useState<boolean>(false);
	const [dialogMode, setDialogMode] = React.useState<DialogMode>(DialogMode.Show);

	const lastMaintenance: Intervention | undefined = vehicle.Interventions?.filter(
		(interv) => interv.InterventionType?.Description === 'MANTENIMIENTO ORDINARIO',
	).sort((a, b) => (a.Date.getTime() < b.Date.getTime() ? -1 : 1))[0];

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
					<>
						<Body2>
							{lastMaintenance
								? `Último Mantenimiento: ${dateFormat(lastMaintenance!.Date, 'es-PY')} - ${
										lastMaintenance!.Kilometers
                                    } km`
								: `Aún no se ha registrado mantenimiento`}
						</Body2>
					</>
				}
				className='tw-mb-4'
			/>
			<Body2>
				<b>Monto de Flota Asignado:</b> {moneyFormat('es-PY', vehicle.FleetCard?.AssignedValue || 0, ' Gs')}
			</Body2>
			<Body2>
				<b>Numero de Tarjeta Flota:</b> {vehicle.FleetCard?.CardNumber ?? 'No asignado'}
			</Body2>
			<Body2>
				<b>Usuario:</b> {vehicle.User}
			</Body2>
			<Body2>
				<b>Km Proximo Mantenimiento:</b>{' '}
				{lastMaintenance?.NextMaintenanceKilometers ?? 'No Registrado'}
			</Body2>
			<CardFooter className='tw-mt-8'>
				<VehicleDialog
					title={`Vehiculo #${vehicle.Id} - ${vehicle.Model} ${vehicle.Plate}`}
					mode={dialogMode}
					open={vehicleDialogOpen}
					setOpen={setVehicleDialogOpen}
					setMode={setDialogMode}
					action={
						dialogMode === DialogMode.Show ? (
							<Edit24Regular
								onClick={() => {
									setDialogMode(DialogMode.Edit);
								}}
							/>
						) : (
							<Dismiss24Regular
								onClick={() => {
									setDialogMode(DialogMode.Show);
								}}
							/>
						)
					}
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
					vehicle={vehicle}
					open={interactionDialogOpen}
					setOpen={setInteractionDialogOpen}
					triggerButton={
						<Button
							appearance='outline'
							icon={<WindowWrench28Regular />}
							iconPosition='before'
							onClick={() => setInteractionDialogOpen(!interactionDialogOpen)}
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
