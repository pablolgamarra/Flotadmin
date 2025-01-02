import * as React from 'react';

import { CrudActions } from '@/common/CrudActions';
import { Currency } from '@/common/Currency';
import { DialogMode } from '@/common/DialogMode';
import { UploadState } from '@/common/UploadState';
import { DataContext } from '@/context/dataContext';
import { CustomDialog } from '@/controls/CustomDialog';
import {
    VehicleRegisterForm,
    VehicleRegisterFormState,
} from '@/controls/vehicles/dialog/content/register/VehicleRegisterForm';
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
import { VehicleDataVisualizer } from './content/visualize/VehicleDataVisualizer';

export interface VehicleDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
	title: string;
	mode: DialogMode;
	vehicle?: Vehicle;
	action?: Slot<'div'>;
	setMode?: (arg0: DialogMode) => void;
}

const parseStateToVehicle = (state: VehicleRegisterFormState): Vehicle => {
	try {
		const parsedState = {
			Id: state.id || -1,
			Plate: state.plate,
			Brand: state.brand,
			Model: state.model,
			ModelYear: state.modelYear?.toString(),
			BuyDate: state.adquisitionDate,
			Cost: state.adquisitionCost,
			CostCurrency: state.costCurrency,
			User: state.user,
			FleetCard: state.fleetCard,
		};

		return parsedState;
	} catch (e) {
		throw new Error(`Error parsing state to vehicle object -> ${e}`);
	}
};

export const VehicleDialog: React.FC<React.PropsWithChildren<VehicleDialogProps>> = (
	props: React.PropsWithChildren<VehicleDialogProps>,
) => {
	const { open, setOpen, triggerButton, title, action, mode, setMode, vehicle, children } = props;

	const { vehiclesService, fleetCardService } = React.useContext(DataContext);

	const toasterId = useId('vehicleDialogToaster');
	const { dispatchToast } = useToastController(toasterId);

	let initialProps;

	//Verificar si se va a editar
	if (vehicle) {
		initialProps = {
			id: vehicle.Id,
			plate: vehicle.Plate,
			brand: vehicle.Brand,
			model: vehicle.Model,
			modelYear: parseInt(vehicle.ModelYear),
			adquisitionDate: vehicle.BuyDate,
			adquisitionCost: vehicle.Cost,
			costCurrency: vehicle.CostCurrency as Currency,
			user: vehicle.User,
			fleetCard: vehicle.FleetCard ? vehicle.FleetCard : ({} as FleetCard),
		};
	} else {
		initialProps = {} as VehicleRegisterFormState;
	}

	const [formState, setFormState] = React.useState<VehicleRegisterFormState>(initialProps);
	const [uploadingState, setUploadingState] = React.useState<UploadState>(UploadState.Idle);

	const saveFormData = async (action: CrudActions) => {
		console.log('Save Form Data Function Called');

		try {
			const parsedVehicle = parseStateToVehicle(formState);
			setUploadingState(UploadState.Uploading);

			if (action === CrudActions.Save) {
				await vehiclesService.create(parsedVehicle);
			}

			if (action === CrudActions.Update) {
				await vehiclesService.update(parsedVehicle);
			}

			setUploadingState(UploadState.Uploaded);
		} catch (e) {
			setUploadingState(UploadState.Failed);
			throw new Error(`Error saving vehicles -> ${e}`);
		}
	};

	const switchActions = (mode: DialogMode, vehicle?: Vehicle) => {
		//Nuevo Registro
		if (!vehicle) {
			return (
				<DialogActions className='tw-sticky tw-bottom-0 tw-bg-white tw-z-10'>
					<DialogTrigger>
						<Button
							appearance='secondary'
							onClick={() => {
								setOpen(false);
                                setFormState({} as VehicleRegisterFormState);
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

	const switchForm = (mode: DialogMode, vehicle?: Vehicle) => {
		switch (mode) {
			case DialogMode.Show:
				return <VehicleDataVisualizer vehicle={vehicle} />;
			case DialogMode.Edit:
				return (
					<VehicleRegisterForm
						formState={formState}
						setFormState={setFormState}
						fleetCardService={fleetCardService}
					/>
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
				dialogActions={switchActions(mode, vehicle)}
			>
				<div className='tw-dialog-content tw-overflow-y-auto'>{switchForm(mode, vehicle)}</div>
			</CustomDialog>
			<Toaster toasterId={toasterId}
					position={'top-end'}
					pauseOnHover={true}/>
		</>
	);
};
