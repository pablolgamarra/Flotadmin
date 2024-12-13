import * as React from 'react';

import { Body2, Button, Card, CardFooter, CardHeader, Title3 } from '@fluentui/react-components';

import { Dismiss24Regular, Edit24Regular, Open28Filled } from '@fluentui/react-icons';

import { DialogMode } from '@/common/DialogMode';
import { FleetCard } from '@/models/FleetCard';
import { FleetCardDialog } from '../dialog/FleetCardDialog';

export interface FleetCardCardProps {
	fleetCard: FleetCard;
	className: string;
}

export const FleetCardCard: React.FC<FleetCardCardProps> = (props) => {
	const { fleetCard, className } = props;

	const [cardDialogOpen, setCardDialogOpen] = React.useState<boolean>(false);
	const [dialogMode, setDialogMode] = React.useState<DialogMode>(DialogMode.Show);

	return (
		<Card
			className={className}
			size='medium'
		>
			<CardHeader
				header={
					<Title3>
						#{fleetCard.Id} - Tarjeta Flota Nro: {fleetCard.CardNumber}
					</Title3>
				}
				className='tw-mb-4'
			/>
			<Body2>
				<b>Monto de Asignado:</b> {fleetCard.AssignedValue} Gs
			</Body2>
			<CardFooter className='tw-mt-8 tw-justify-center'>
				<FleetCardDialog
					title={`Tarjeta #${fleetCard.CardNumber}`}
					mode={dialogMode}
					open={cardDialogOpen}
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
					setOpen={setCardDialogOpen}
					triggerButton={
						<Button
							appearance='primary'
							icon={<Open28Filled />}
							iconPosition='before'
							onClick={() => {
								setCardDialogOpen(!cardDialogOpen);
							}}
						>
							Ver
						</Button>
					}
					fleetCard={fleetCard}
				/>
			</CardFooter>
		</Card>
	);
};
