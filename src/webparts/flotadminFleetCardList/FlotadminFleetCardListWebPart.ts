import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IVehicleService } from '@/services/business/IVehicleService';
import { IInterventionService } from '@/services/business/IInterventionService';
import { IFleetCardService } from '@/services/business/IFleetCardService';
import { IInterventionTypeService } from '@/services/business/IInterventionTypeService';
import { App, AppProps } from '@fleetCardsList/components/App';
import { MockVehicleService } from '@/services/business/MockVehicleService';
import { MockInterventionService } from '@/services/business/MockInterventionService';
import { MockFleetCardService } from '@/services/business/MockFleetCardService';
import { MockInterventionTypeService } from '@/services/business/MockInterventionTypeService';

import * as strings from 'FlotadminFleetCardWebPartStrings';

export interface IFlotadminFleetCardListWebPartProps {
	description: string;
}

export default class FlotadminFleetCardListWebPart extends BaseClientSideWebPart<IFlotadminFleetCardListWebPartProps> {
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

		try {
			this.vehicleService = this.context.serviceScope.consume(
				MockVehicleService.serviceKey,
			);
			this.interventionService = this.context.serviceScope.consume(
				MockInterventionService.serviceKey,
			);
			this.fleetCardService = this.context.serviceScope.consume(
				MockFleetCardService.serviceKey,
			);
			this.interventionTypeService = this.context.serviceScope.consume(
				MockInterventionTypeService.serviceKey,
			);
		} catch (e) {
			console.error(strings.Errors.ErrorInitServices, e);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}
}
