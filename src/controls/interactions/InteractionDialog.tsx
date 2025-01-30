import * as React from 'react';

import { UploadState } from '@/common/UploadState';
import { DataContext } from '@/context/dataContext';
import { Intervention } from '@/models/Intervention';
import {
	Button,
	DialogActions,
	DialogTrigger,
	Spinner,
	Toast,
	ToastBody,
	Toaster,
	ToastTitle,
	useId,
	useToastController,
} from '@fluentui/react-components';
import { CustomDialog } from '../CustomDialog';
import { InteractionDataForm, InteractionRegisterFormState } from './InteractionDataForm';

export interface InteractionDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
}

const parseStateToInteraction = (state: InteractionRegisterFormState): Intervention => {
	try {
		const parsedState = {
			Id: state.id || -1,
			InterventionType: state.interventionType,
			Date: state.realizationDate,
			Kilometers: state.kilometers.toString(),
			Description: state.description,
			Cost: state.cost,
			CostCurrency: state.costCurrency,
			Vehicle: state.vehicle,
		};

		return parsedState;
	} catch (e) {
		throw new Error(`Error parsing state to interaction object -> ${e}`);
	}
};

export const InteractionDialog: React.FC<React.PropsWithChildren<InteractionDialogProps>> = (props) => {
	const { open, setOpen, triggerButton, children } = props;
	const { interventionTypesService, interventionsService } = React.useContext(DataContext);

	const toasterId = useId('interactionDialogToaster');
	const { dispatchToast } = useToastController(toasterId);

	const [interactionFormState, setInteractionFormState] = React.useState<InteractionRegisterFormState>(
		{} as InteractionRegisterFormState,
	);
	const [uploadingState, setUploadingState] = React.useState<UploadState>(UploadState.Idle);

	const saveFormData = async () => {
		try {
			setUploadingState(UploadState.Uploading);
			const parsedInteraction = parseStateToInteraction(interactionFormState);
			await interventionsService.create(parsedInteraction);
			setUploadingState(UploadState.Uploaded);
		} catch (e) {
			setUploadingState(UploadState.Failed);
			console.error(`Error saving interaction -> ${e}`);
		}
	};

	React.useEffect(() => {
		switch (uploadingState) {
			case UploadState.Uploading:
				dispatchToast(
					<Toast>
						<ToastTitle media={<Spinner size='tiny' />}>Guardando Interacción</ToastTitle>
						<ToastBody>Enviando datos al servidor...</ToastBody>
					</Toast>,
				);
				break;
			case UploadState.Uploaded:
				dispatchToast(
					<Toast>
						<ToastTitle>Datos Guardados Correctamente</ToastTitle>
						<ToastBody>Se registraron los datos de la interacción</ToastBody>
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
	}, [uploadingState]);

	return (
		<>
			{triggerButton}
			<CustomDialog
				open={open}
				setOpen={setOpen}
				primaryButtonText='Guardar'
				secondaryButtonText='Cancelar'
				title='Registrar Interacción'
				trigger={children as HTMLButtonElement}
				dialogActions={
					<DialogActions className='tw-sticky tw-bottom-0 tw-bg-white tw-z-10'>
						<DialogTrigger>
							<Button
								appearance='secondary'
								onClick={() => {
									setOpen(false);
									setInteractionFormState({} as InteractionRegisterFormState);
								}}
							>
								Descartar
							</Button>
						</DialogTrigger>
						<DialogTrigger>
							<Button
								appearance='primary'
								onClick={() => {
									saveFormData();
								}}
							>
								Guardar
							</Button>
						</DialogTrigger>
					</DialogActions>
				}
			>
				<InteractionDataForm
					interventionTypesService={interventionTypesService}
					formState={interactionFormState}
					setFormState={setInteractionFormState}
				/>
			</CustomDialog>
			<Toaster
				toasterId={toasterId}
				position={'top-end'}
				pauseOnHover={true}
			/>
		</>
	);
};
