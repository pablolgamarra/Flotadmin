import * as React from 'react';

import {
	Card,
	CardHeader,
	CardFooter,
	Title3,
	Button,
} from '@fluentui/react-components';

import {
	Dismiss24Regular,
	Edit24Regular,
	Open28Filled,
} from '@fluentui/react-icons';

import { DialogMode } from '@/common/DialogMode';
import { InterventionType } from '@/models/InterventionType';
import { InterventionTypeDialog } from '../dialog/InterventionTypeDialog';

export interface InterventionTypeCardProps {
	interventionType: InterventionType;
	className: string;
}

export const InterventionTypeCard: React.FC<InterventionTypeCardProps> = (
	props,
) => {
	const { interventionType, className } = props;

	const [interventionTypeDialogOpen, setInterventionTypeDialog] =
		React.useState<boolean>(false);
	const [dialogMode, setDialogMode] = React.useState<DialogMode>(
		DialogMode.Show,
	);

	return (
		<Card
			className={className}
			size='medium'
		>
			<CardHeader
				header={
					<Title3>
						#{interventionType.Id} - {interventionType.Description}
					</Title3>
				}
				className='tw-mb-4'
			/>
			<CardFooter className='tw-mt-8 tw-justify-center'>
				<InterventionTypeDialog
					title={`${interventionType.Description}`}
					mode={dialogMode}
					open={interventionTypeDialogOpen}
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
					setOpen={setInterventionTypeDialog}
					triggerButton={
						<Button
							appearance='primary'
							icon={<Open28Filled />}
							iconPosition='before'
							onClick={() => {
								setInterventionTypeDialog(
									!interventionTypeDialogOpen,
								);
							}}
						>
							Ver
						</Button>
					}
					interventionType={interventionType}
				/>
			</CardFooter>
		</Card>
	);
};
