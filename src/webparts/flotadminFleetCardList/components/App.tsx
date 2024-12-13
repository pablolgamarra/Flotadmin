import * as React from 'react';

//Components
import { Button, Field, IdPrefixProvider, SearchBox, Title1, useId } from '@fluentui/react-components';
import { AddCircle28Regular } from '@fluentui/react-icons';

//Styles
import { DialogMode } from '@/common/DialogMode';
import { DataProvider } from '@/context/dataContext';
import { FleetCardCard } from '@/controls/fleetCards/card/FleetCardCard';
import { FleetCardDialog } from '@/controls/fleetCards/dialog/FleetCardDialog';
import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from '@/services/business/IFleetCardService';
import { IInterventionService } from '@/services/business/IInterventionService';
import { IInterventionTypeService } from '@/services/business/IInterventionTypeService';
import { IVehicleService } from '@/services/business/IVehicleService';
import '../../../../assets/dist/tailwind.css';

import * as strings from 'FlotadminFleetCardWebPartStrings';

export interface AppProps {
	fleetCardService: IFleetCardService;
	interventionsService: IInterventionService;
	interventionTypesService: IInterventionTypeService;
	vehiclesService: IVehicleService;
}

export const App: React.FC<AppProps> = (props) => {
	const id = useId('App');
	const { fleetCardService, interventionsService, interventionTypesService, vehiclesService } = props;

	const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

	const [fleetCards, setFleetCards] = React.useState<FleetCard[]>([]);

	React.useEffect(() => {
		const getFleetCards = async () => {
			try {
				const cardList = await fleetCardService.listAll();
				setFleetCards(cardList);
			} catch (e) {
				console.error(strings.Errors.ErrorQuerying, e);
			}
		};

		getFleetCards();
	}, [setFleetCards]);

	return (
		<IdPrefixProvider value='Flotadmin'>
			<DataProvider
				{...{
					vehiclesService: vehiclesService,
					fleetCardService: fleetCardService,
					interventionsService: interventionsService,
					interventionTypesService: interventionTypesService,
				}}
			>
				<div className='tw-w-8/12 tw-mx-auto'>
					<section className='tw-flex tw-flex-col tw-w-full tw-mb-2'>
						<Title1
							as='h2'
							align='center'
							className='tw-mt-8'
						>
							{strings.WebPartTitle.Title}
						</Title1>
						<Field className='tw-flex tw-mt-6'>
							<SearchBox
								className='tw-max-w-none tw-w-10/12 tw-mr-4'
								placeholder='Buscar Tarjetas'
							/>
							<FleetCardDialog
								title='Registrar Nueva Tarjeta'
								mode={DialogMode.Edit}
								open={dialogOpen}
								setOpen={setDialogOpen}
								triggerButton={
									<Button
										className='tw-w-2/12'
										appearance='primary'
										icon={<AddCircle28Regular />}
										onClick={() => {
											setDialogOpen(!dialogOpen);
										}}
									>
										{strings.CreateNewButton.Text}
									</Button>
								}
							/>
						</Field>
					</section>
					<div
						id='cards-container'
						className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-px-4 tw-gap-4'
					>
						{fleetCards.map((item: FleetCard) => (
							<FleetCardCard
								key={`${id}-${item.CardNumber}`}
								fleetCard={item}
								className='tw-w-fit hover:tw-shadow-sm tw-h-fit'
							/>
						))}
					</div>
				</div>
			</DataProvider>
		</IdPrefixProvider>
	);
};
