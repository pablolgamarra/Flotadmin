import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { ErrorVisualizer } from '@/controls/ErrorVisualizer';
import { IFleetCardService } from '@/services/business/IFleetCardService';
import { IInterventionService } from '@/services/business/IInterventionService';
import { IInterventionTypeService } from '@/services/business/IInterventionTypeService';
import { IVehicleService } from '@/services/business/IVehicleService';
import { MockFleetCardService } from '@/services/business/MockFleetCardService';
import { MockInterventionService } from '@/services/business/MockInterventionService';
import { MockInterventionTypeService } from '@/services/business/MockInterventionTypeService';
import { MockVehicleService } from '@/services/business/MockVehicleService';
import { App } from '@vehiclesList/components/App';
import * as strings from 'FlotadminVehiclesListWebPartStrings';
// import { InterventionTypeService } from '@/services/business/InterventionTypeService';
// import { FleetCardService } from '@/services/business/FleetCardService';
// import { InterventionService } from '@/services/business/InterventionService';
// import { VehicleService } from '@/services/business/VehicleService';

export interface IFlotadminVehiclesListWebPartProps {
	description: string;
}

export default class FlotadminVehiclesListWebPart extends BaseClientSideWebPart<IFlotadminVehiclesListWebPartProps> {
	private vehicleService!: IVehicleService;
	private interventionService!: IInterventionService;
	private fleetCardService!: IFleetCardService;
	private interventionTypeService!: IInterventionTypeService;
	private element!: React.ReactElement;

	public async onInit(): Promise<void> {
		await super.onInit();

		try {
			this.vehicleService = this.context.serviceScope.consume(MockVehicleService.serviceKey);
			this.interventionService = this.context.serviceScope.consume(MockInterventionService.serviceKey);
			this.fleetCardService = this.context.serviceScope.consume(MockFleetCardService.serviceKey);
			this.interventionTypeService = this.context.serviceScope.consume(MockInterventionTypeService.serviceKey);
		} catch (e) {
			console.error('Error inicializando los servicios:', e);
		}
	}

	public async render(): Promise<void> {
		try {
			this.element = React.createElement(App, {
				vehiclesService: this.vehicleService,
				fleetCardService: this.fleetCardService,
				interventionsService: this.interventionService,
				interventionTypesService: this.interventionTypeService,
			});
		} catch (e) {
			console.error(`Error al renderizar el componente principal: ${e}`);
			this.element = React.createElement(ErrorVisualizer);
		}

		ReactDom.render(this.element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
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
							],
						},
					],
				},
			],
		};
	}
}
