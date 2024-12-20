import * as React from 'react';

import { DataContext } from '@/context/dataContext';
import { CustomDialog } from '../CustomDialog';
import { InteractionDataForm, InteractionRegisterFormState } from './InteractionDataForm';

export interface InteractionDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
}

export const InteractionDialog: React.FC<React.PropsWithChildren<InteractionDialogProps>> = (props) => {
	const { open, setOpen, triggerButton, children } = props;

	const { interventionTypesService } = React.useContext(DataContext);

	const [interactionFormState, setInteractionFormState] = React.useState<InteractionRegisterFormState>(
		{} as InteractionRegisterFormState,
	);

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
			>
				<InteractionDataForm
					interventionTypesService={interventionTypesService}
					formState={interactionFormState}
					setFormState={setInteractionFormState}
				/>
			</CustomDialog>
		</>
	);
};
