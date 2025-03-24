import * as React from 'react';

//Components
import {
	Button,
	Field,
	FluentProvider,
	IdPrefixProvider,
	SearchBox,
	Title1,
	webLightTheme,
} from '@fluentui/react-components';
import { AddCircle28Regular } from '@fluentui/react-icons';

//Styles
import { DialogMode } from '@/common/DialogMode';
import { DataProvider } from '@/context/dataContext';
import { FleetCardDialog } from '@/controls/fleetCards/dialog/FleetCardDialog';
import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { IInterventionService } from '@/services/business/interfaces/IInterventionService';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import '../../../../assets/dist/tailwind.css';

import { FleetCardListPaged } from '@/controls/fleetCards/lists/FleetCardListPaged';
import * as strings from 'FlotadminFleetCardWebPartStrings';

export interface AppProps {
	fleetCardService: IFleetCardService;
	interventionsService: IInterventionService;
	interventionTypesService: IInterventionTypeService;
	vehiclesService: IVehicleService;
}

export const App: React.FC<AppProps> = (props) => {
	const { fleetCardService, interventionsService, interventionTypesService, vehiclesService } = props;

	const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

	return (
		<IdPrefixProvider value='Flotadmin-fleet-cards-list'>
			<FluentProvider theme={webLightTheme}>
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
						<FleetCardListPaged
							vehicleService={vehiclesService}
							fleetCardService={fleetCardService}
						/>
					</div>
				</DataProvider>
			</FluentProvider>
		</IdPrefixProvider>
	);
};
