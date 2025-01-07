import * as React from 'react';

import { CrudActions } from '@/common/CrudActions';
import { DialogMode } from '@/common/DialogMode';
import { UploadState } from '@/common/UploadState';
import { CustomDialog } from '@/controls/CustomDialog';
import { useDataContext } from '@/hooks/useDataContext';
import { InterventionType } from '@/models/InterventionType';
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
import {
	InterventionTypeRegisterForm,
	InterventionTypeRegisterFormState,
} from './content/register/InterventionTypeRegisterForm';
import { InterventionTypeDataVisualizer } from './content/visualize/InterventionTypeDataVisualizer';

export interface InterventionTypeDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
	title: string;
	mode: DialogMode;
	interventionType?: InterventionType;
	action?: Slot<'div'>;
	setMode?: (arg0: DialogMode) => void;
}

const parseStateToInterventionType = (state: InterventionTypeRegisterFormState): InterventionType => {
	try {
		const parsedState = {
			Id: state.id || -1,
			Description: state.description,
		};

		return parsedState;
	} catch (e) {
		throw new Error(`Error parsing state to interventionType object -> ${e}`);
	}
};

export const InterventionTypeDialog: React.FC<React.PropsWithChildren<InterventionTypeDialogProps>> = (
	props: React.PropsWithChildren<InterventionTypeDialogProps>,
) => {
	const { open, setOpen, setMode, triggerButton, title, action, mode, interventionType, children } = props;
	const { interventionTypesService } = useDataContext();

	const toasterId = useId('interventionTypeToast');
	const { dispatchToast } = useToastController(toasterId);

	let initialValues = {} as InterventionTypeRegisterFormState;

	if (interventionType) {
		initialValues = {
			id: interventionType.Id,
			description: interventionType.Description,
		};
	}

	const [formState, setFormState] = React.useState<InterventionTypeRegisterFormState>(initialValues);
	const [uploadingState, setUploadingState] = React.useState<UploadState>(UploadState.Idle);

	const saveFormData = async (action: CrudActions) => {
		console.log('saveFleetCardData', action);

		try {
			const parsedState = parseStateToInterventionType(formState);
			setUploadingState(UploadState.Uploading);

			if (action === CrudActions.Save) {
				await interventionTypesService.create(parsedState);
			}

			if (action === CrudActions.Update) {
				await interventionTypesService.update(parsedState);
			}
		} catch (e) {
			setUploadingState(UploadState.Failed);
			throw new Error(`Error saving fleetCards -> ${e}`);
		} finally {
			setUploadingState(UploadState.Uploaded);
		}
	};

	const switchContent = (mode: DialogMode, interventionType?: InterventionType) => {
		switch (mode) {
			case DialogMode.Show:
				return <InterventionTypeDataVisualizer interventionType={interventionType} />;
			case DialogMode.Edit:
				return (
					<InterventionTypeRegisterForm
						formState={formState}
						setFormState={setFormState}
					/>
				);
		}
	};

	const switchActions = (mode: DialogMode) => {
		//Nuevo Registro
		if (!interventionType) {
			return (
				<DialogActions className='tw-sticky tw-bottom-0 tw-bg-white tw-z-10'>
					<DialogTrigger>
						<Button
							appearance='secondary'
							onClick={() => {
								setOpen(false);
								setFormState({} as InterventionTypeRegisterFormState);
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
				dialogActions={switchActions(mode)}
			>
				{switchContent(mode, interventionType)}
			</CustomDialog>
			<Toaster
				toasterId={toasterId}
				position={'top-end'}
				pauseOnHover={true}
			/>
		</>
	);
};
