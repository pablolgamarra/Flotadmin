import * as React from 'react';
import { CustomDialog } from '../CustomDialog';
import { InteractionDataForm } from './InteractionDataForm';
import { InterventionType } from '@/models/InterventionType';
import { DataContext } from '@/context/dataContext';

export interface InteractionDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
}

export const InteractionDialog: React.FC<
	React.PropsWithChildren<InteractionDialogProps>
> = (props) => {
	const { open, setOpen, triggerButton, children } = props;

	const [interactionTypes, setInteractionTypes] = React.useState<
		InterventionType[]
	>([]);

	const { interventionTypesService } = React.useContext(DataContext);

	React.useEffect(() => {
		const getInteractionTypes = async () => {
			try {
				const interactions = await interventionTypesService.listAll();
				setInteractionTypes(interactions);
			} catch (e) {
				console.log(`Error listando tipos de intervencion ${e}`);
			}
		};

		getInteractionTypes();
	}, [setInteractionTypes]);

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
				<InteractionDataForm interactionTypes={interactionTypes} />
			</CustomDialog>
		</>
	);
};
