import * as React from 'react';

import { CrudActions } from '@/common/CrudActions';
import { DialogMode } from '@/common/DialogMode';
import { UploadState } from '@/common/UploadState';
import { CustomDialog } from '@/controls/CustomDialog';
import { useDataContext } from '@/hooks/useDataContext';
import { useVehicleList } from '@/hooks/useVehicleList';
import { FleetCard } from '@/models/FleetCard';
import { Vehicle } from '@/models/Vehicle';
import {
	Button,
	DialogActions,
	DialogTrigger,
	Slot,
	Spinner,
	Toast,
	ToastBody,
	Toaster,
	ToastTitle,
	useId,
	useToastController,
} from '@fluentui/react-components';
import { FleetCardRegisterForm, FleetCardRegisterFormState } from './content/register/FleetCardRegisterForm';
import { FleetCardDataVisualizer } from './content/visualize/FleetCardDataVisualizer';

export interface FleetCardDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
	title: string;
	mode: DialogMode;
	fleetCard?: FleetCard;
	action?: Slot<'div'>;
	setMode?: (arg0: DialogMode) => void;
}

const parseStateToFleetCard = (state: FleetCardRegisterFormState): FleetCard => {
	try {
		const parsedState = {
			Id: state.id || -1,
			CardNumber: state.cardNumber,
			AssignedValue: state.assignedValue,
			IsActive: state.isActive,
		};

		return parsedState;
	} catch (e) {
		throw new Error(`Error parsing state to fleetCard object -> ${e}`);
	}
};

export const FleetCardDialog: React.FC<React.PropsWithChildren<FleetCardDialogProps>> = (
	props: React.PropsWithChildren<FleetCardDialogProps>,
) => {
	const { open, setOpen, setMode, triggerButton, title, action, mode, fleetCard, children } = props;

	let initialValues;
	const toasterId = useId('vehicleDialogToaster');
	const { dispatchToast } = useToastController(toasterId);

	const { vehiclesService } = useDataContext();
	const { vehicleList } = useVehicleList(vehiclesService);
	const linkedVehicle: Vehicle | undefined = vehicleList.find(
		(vehicle: Vehicle) => vehicle.FleetCard?.Id === fleetCard?.Id,
	);

	//Verificar si se va a editar
	if (fleetCard) {
		initialValues = {
			id: fleetCard.Id,
			cardNumber: fleetCard.CardNumber,
			assignedValue: fleetCard.AssignedValue,
			isActive: fleetCard.IsActive,
			assignedVehicle: vehicleList.find((vehicle: Vehicle) => vehicle.FleetCard?.Id === fleetCard?.Id),
		};
	} else {
		initialValues = {} as FleetCardRegisterFormState;
	}

	const { fleetCardService } = useDataContext();

	const [formState, setFormState] = React.useState<FleetCardRegisterFormState>(initialValues);
	const [uploadingState, setUploadingState] = React.useState<UploadState>(UploadState.Idle);

	const saveFormData = async (action: CrudActions) => {
		console.log('saveFleetCardData', action);

		try {
			const parsedState = parseStateToFleetCard(formState);
			const vehicle = {
				...(formState.assignedVehicle || ({} as Vehicle)),
				FleetCard: fleetCard || ({} as FleetCard),
			};
			setUploadingState(UploadState.Uploading);

			if (action === CrudActions.Save) {
				await fleetCardService.create(parsedState);
				if (vehicle) {
					await vehiclesService.update(vehicle);
				}
			}

			if (action === CrudActions.Update) {
				await fleetCardService.update(parsedState);
				if (vehicle) {
					await vehiclesService.update(vehicle);
				}
			}
		} catch (e) {
			setUploadingState(UploadState.Failed);
			throw new Error(`Error saving fleetCards -> ${e}`);
		} finally {
			setUploadingState(UploadState.Uploaded);
		}
	};

	const switchContent = (mode: DialogMode, fleetCard?: FleetCard) => {
		switch (mode) {
			case DialogMode.Show:
				return (
					<FleetCardDataVisualizer
						fleetCard={fleetCard}
						linkedVehicle={linkedVehicle}
					/>
				);
			case DialogMode.Edit:
				return (
					<FleetCardRegisterForm
						formState={formState}
						setFormState={setFormState}
					/>
				);
		}
	};

	const switchActions = (mode: DialogMode, fleetCard?: FleetCard) => {
		//Nuevo Registro
		if (!fleetCard) {
			return (
				<DialogActions className='tw-sticky tw-bottom-0 tw-bg-white tw-z-10'>
					<DialogTrigger>
						<Button
							appearance='secondary'
							onClick={() => {
								setOpen(false);
								setFormState({} as FleetCardRegisterFormState);
							}}
						>
							Descartar
						</Button>
					</DialogTrigger>
					<DialogTrigger>
						<Button
							appearance='primary'
							onClick={() => {
								saveFormData(CrudActions.Save);
							}}
						>
							Guardar
						</Button>
					</DialogTrigger>
				</DialogActions>
			);
		}

		switch (mode) {
			//Solo visualizacion, si o si tiene vehiculo
			case DialogMode.Show:
				return (
					<DialogActions className='tw-sticky tw-bottom-0 tw-bg-white tw-z-10'>
						<DialogTrigger>
							<Button
								appearance='primary'
								onClick={() => {
									setOpen(false);
									setFormState({} as FleetCardRegisterFormState);
									setOpen(false);
								}}
							>
								Cerrar
							</Button>
						</DialogTrigger>
					</DialogActions>
				);
			//Modo Edicion despues de haber clickado en visualizar en el componente Card
			case DialogMode.Edit:
				return (
					<DialogActions className='tw-sticky tw-bottom-0 tw-bg-white tw-z-10'>
						<DialogTrigger>
							<Button
								appearance='secondary'
								onClick={(ev) => {
									ev.preventDefault();
									if (setMode) {
										setMode(DialogMode.Show);
									}
								}}
							>
								Cancelar
							</Button>
						</DialogTrigger>
						<DialogTrigger>
							<Button
								appearance='primary'
								onClick={() => {
									saveFormData(CrudActions.Update);
								}}
							>
								Guardar
							</Button>
						</DialogTrigger>
					</DialogActions>
				);
		}
	};

	React.useEffect(() => {
		switch (uploadingState) {
			case UploadState.Uploading:
				dispatchToast(
					<Toast>
						<ToastTitle media={<Spinner size='tiny' />}>Guardando Datos del Vehiculo</ToastTitle>
						<ToastBody>Enviando datos al servidor...</ToastBody>
					</Toast>,
				);
				break;
			case UploadState.Uploaded:
				dispatchToast(
					<Toast>
						<ToastTitle>Datos Guardados Correctamente</ToastTitle>
						<ToastBody>Se registraron los datos del vehiculo</ToastBody>
					</Toast>,
					{ intent: 'success' },
				);
				setTimeout(() => {
					window.location.reload();
				}, 1000);
				break;
			case UploadState.Failed:
				dispatchToast(
					<Toast>
						<ToastTitle>Error al Guardar los Datos</ToastTitle>
						<ToastBody>Por favor, vuelva a intentarlo más tarde</ToastBody>
					</Toast>,
					{ intent: 'error' },
				);
				break;
			default:
				break;
		}
	}, [uploadingState, dispatchToast]);

	React.useEffect(() => {
		if (fleetCard) {
			const assigned = vehicleList.find((vehicle: Vehicle) => vehicle.FleetCard?.Id === fleetCard.Id);
			if (assigned) {
				setFormState((prevState) => ({ ...prevState, assignedVehicle: assigned }));
			}
		}
	}, [vehicleList, fleetCard]);

	return (
		<>
			{triggerButton}
			<CustomDialog
				open={open}
				setOpen={setOpen}
				title={title}
				action={action}
				primaryButtonText='Guardar'
				secondaryButtonText='Cancelar'
				trigger={children as HTMLButtonElement}
				dialogActions={switchActions(mode, fleetCard)}
			>
				{switchContent(mode, fleetCard)}
			</CustomDialog>
			<Toaster
				toasterId={toasterId}
				position={'top-end'}
				pauseOnHover={true}
			/>
		</>
	);
};
