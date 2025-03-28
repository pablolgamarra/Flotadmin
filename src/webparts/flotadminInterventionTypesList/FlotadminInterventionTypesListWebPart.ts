import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { IInterventionService } from '@/services/business/interfaces/IInterventionService';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import { MockFleetCardService } from '@/services/business/mocks/MockFleetCardService';
import { MockInterventionService } from '@/services/business/mocks/MockInterventionService';
import { MockInterventionTypeService } from '@/services/business/mocks/MockInterventionTypeService';
import { MockVehicleService } from '@/services/business/mocks/MockVehicleService';
import { App, AppProps } from '@interventionTypesList/components/App';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { FleetCardService } from '@/services/business/FleetCardService';
import { InterventionService } from '@/services/business/InterventionService';
import { InterventionTypeService } from '@/services/business/InterventionTypeService';
import { VehicleService } from '@/services/business/VehicleService';
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import * as strings from 'FlotadminInterventionTypesListWebPartStrings';

export interface IFlotadminInterventionTypesListWebPartProps {
	description: string;
	isTestEnvironment: boolean;
}

export default class FlotadminInterventionTypesListWebPart extends BaseClientSideWebPart<IFlotadminInterventionTypesListWebPartProps> {
	private vehicleService!: IVehicleService;
	private interventionService!: IInterventionService;
	private fleetCardService!: IFleetCardService;
	private interventionTypeService!: IInterventionTypeService;

	public render(): void {
		const element: React.ReactElement<AppProps> = React.createElement(App, {
			vehiclesService: this.vehicleService,
			interventionsService: this.interventionService,
			fleetCardService: this.fleetCardService,
			interventionTypesService: this.interventionTypeService,
		});

		ReactDom.render(element, this.domElement);
	}

	public async onInit(): Promise<void> {
		await super.onInit();

		const isTestEnvironment: boolean = this.properties.isTestEnvironment;

		if (isTestEnvironment) {
			try {
				this.vehicleService = this.context.serviceScope.consume(MockVehicleService.serviceKey);
				this.interventionService = this.context.serviceScope.consume(MockInterventionService.serviceKey);
				this.fleetCardService = this.context.serviceScope.consume(MockFleetCardService.serviceKey);
				this.interventionTypeService = this.context.serviceScope.consume(
					MockInterventionTypeService.serviceKey,
				);
			} catch (e) {
				console.error('Error inicializando los servicios:', e);
			}
		} else {
			try {
				this.vehicleService = this.context.serviceScope.consume(VehicleService.serviceKey);
				this.interventionService = this.context.serviceScope.consume(InterventionService.serviceKey);
				this.fleetCardService = this.context.serviceScope.consume(FleetCardService.serviceKey);
				this.interventionTypeService = this.context.serviceScope.consume(InterventionTypeService.serviceKey);
			} catch (e) {
				console.error('Error inicializando los servicios:', e);
			}
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.ListsSettingsGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: strings.DescriptionFieldLabel,
								}),
								PropertyPaneToggle('isTestEnvironment', {
									label: strings.IsTestEnvironmentFieldLabel,
									checked: false,
								}),
							],
						},
					],
				},
			],
		};
	}
}
