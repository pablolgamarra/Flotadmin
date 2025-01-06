import * as React from 'react';

import { CrudActions } from '@/common/CrudActions';
import { DialogMode } from '@/common/DialogMode';
import { DataContext } from '@/context/dataContext';
import { CustomDialog } from '@/controls/CustomDialog';
import { FleetCard } from '@/models/FleetCard';
import { Button, DialogActions, DialogTrigger, Slot } from '@fluentui/react-components';
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

	//Verificar si se va a editar
	if (fleetCard) {
		initialValues = {
			id: fleetCard.Id,
			cardNumber: fleetCard.CardNumber,
			assignedValue: fleetCard.AssignedValue,
		};
	} else {
		initialValues = {} as FleetCardRegisterFormState;
	}

	const { fleetCardService } = React.useContext(DataContext);

	const [formState, setFormState] = React.useState<FleetCardRegisterFormState>(initialValues);

	const saveFormData = async (action: CrudActions) => {
		console.log('saveFleetCardData', action);

		try {
			const parsedState = parseStateToFleetCard(formState);

			if (action === CrudActions.Save) {
				await fleetCardService.create(parsedState);
			}

			if (action === CrudActions.Update) {
				await fleetCardService.update(parsedState);
			}
		} catch (e) {
			throw new Error(`Error saving fleetCards -> ${e}`);
		}
	};

	const switchContent = (mode: DialogMode, fleetCard?: FleetCard) => {
		switch (mode) {
			case DialogMode.Show:
				return <FleetCardDataVisualizer fleetCard={fleetCard} />;
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
		</>
	);
};
