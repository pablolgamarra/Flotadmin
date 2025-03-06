import * as React from 'react';

//Components
import { VehicleDialog } from '@/controls/vehicles/dialog/VehicleDialog';
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
import { VehiclePagedList } from '@/controls/vehicles/VehiclePagedList';
import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { IInterventionService } from '@/services/business/interfaces/IInterventionService';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import '../../../../assets/dist/tailwind.css';

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
		<IdPrefixProvider value='Flotadmin-vehicles-list'>
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
								Todos los Vehículos
							</Title1>
							<Field className='tw-flex tw-mt-6'>
								<SearchBox
									className='tw-max-w-none tw-w-10/12 tw-mr-4'
									placeholder='Buscar Vehículos'
								/>
								<VehicleDialog
									title='Registrar Nuevo Vehiculo'
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
											Nuevo Vehiculo
										</Button>
									}
								/>
							</Field>
						</section>
						{/* <div
								id='cards-container'
								className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-gap-4'
							>
								{loading ? (
									<Spinner
										label='Cargando Vehiculos Registrados'
										size='tiny'
									/>
								) : (
									vehicles.map((item: Vehicle) => (
										<VehicleCard
											key={`${id}-${item.Plate}`}
											vehicle={item}
											className='tw-w-fit hover:tw-shadow-sm tw-h-fit'
										/>
									))
								)}
							</div> */}
						<VehiclePagedList vehicleService={vehiclesService} />
						{/* <div
								id='cards-container'
								className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-gap-4'
							>
								{isLoading ? (
									<Spinner
										label='Cargando Vehiculos Registrados'
										size='tiny'
									/>
								) : (
									vehicleList.map((item: Vehicle) => (
										<VehicleCard
											key={`${id}-${item.Plate}`}
											vehicle={item}
											className='tw-w-fit hover:tw-shadow-sm tw-h-fit'
										/>
									))
								)}
							</div> */}
					</div>
				</DataProvider>
			</FluentProvider>
		</IdPrefixProvider>
	);
};
