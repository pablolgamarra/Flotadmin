import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FlotadminVehiclesListWebPartStrings';
import { App } from '@/components/App';
import { getAllInterventionTypes } from '@/services/InterventionTypes';
import { getAllIntervention } from '@/services/Intervention';
import { getAllFleetCards } from '@/services/FleetCards';
import { getAllVehicles } from '@/services/Vehicles';
import { ErrorVisualizer } from '@/components/ErrorVisualizer';

export interface IFlotadminVehiclesListWebPartProps {
	description: string;
}

//Data temp para pruebas
// const vehiclesList: Vehicle[] = [
// 	{
// 		Id: 1,
// 		Plate: 'ABC 123',
// 		Brand: 'Chevrolet',
// 		BuyDate: new Date('04/01/2024'),
// 		Cost: 36000,
// 		CostCurrency: 'Dólar',
// 		FleetCard: {
// 			Id: 1,
// 			CardNumber: '1597538426',
// 			AssignedValue: 3000000,
// 		},
// 		Model: 'S 10 C/D',
// 		ModelYear: '2024',
// 		User: 'Central',
// 	},
// 	{
// 		Id: 2,
// 		Plate: 'DEF 456',
// 		Brand: 'KIA',
// 		BuyDate: new Date('15/03/2018'),
// 		Cost: 20000,
// 		CostCurrency: 'Dolar',
// 		FleetCard: {
// 			Id: 2,
// 			CardNumber: '147258369',
// 			AssignedValue: 6000000,
// 		},
// 		Model: 'SORENTO',
// 		ModelYear: '2019',
// 		User: 'Central',
// 	},
// 	{
// 		Id: 3,
// 		Plate: 'XYZ 789',
// 		Brand: 'Chevrolet',
// 		BuyDate: new Date('20/04/2021'),
// 		Cost: 36000,
// 		CostCurrency: 'Dolar',
// 		FleetCard: {
// 			Id: 3,
// 			CardNumber: '1597538427',
// 			AssignedValue: 8000000,
// 		},
// 		Model: 'S 10 C/S',
// 		ModelYear: '2021',
// 		User: 'Central',
// 	},
// 	{
// 		Id: 4,
// 		Plate: 'XYZ 789',
// 		Brand: 'Toyota',
// 		BuyDate: new Date('2023-07-15'),
// 		Cost: 28000,
// 		CostCurrency: 'Dólar',
// 		FleetCard: {
// 			Id: 4,
// 			CardNumber: '7539514862',
// 			AssignedValue: 2500000,
// 		},
// 		Model: 'Hilux SR',
// 		ModelYear: '2023',
// 		User: 'Sucursal Norte',
// 	},
// 	{
// 		Id: 5,
// 		Plate: 'JKL 456',
// 		Brand: 'Ford',
// 		BuyDate: new Date('2022-09-10'),
// 		Cost: 45000,
// 		CostCurrency: 'Dólar',
// 		FleetCard: {
// 			Id: 5,
// 			CardNumber: '1234567890',
// 			AssignedValue: 4000000,
// 		},
// 		Model: 'Ranger XLT',
// 		ModelYear: '2022',
// 		User: 'Sucursal Sur',
// 	},
// 	{
// 		Id: 6,
// 		Plate: 'DEF 321',
// 		Brand: 'Nissan',
// 		BuyDate: new Date('2021-11-25'),
// 		Cost: 32000,
// 		CostCurrency: 'Dólar',
// 		FleetCard: {
// 			Id: 6,
// 			CardNumber: '6543219875',
// 			AssignedValue: 2000000,
// 		},
// 		Model: 'Frontier LE',
// 		ModelYear: '2021',
// 		User: 'Central',
// 	},
// 	{
// 		Id: 7,
// 		Plate: 'GHI 654',
// 		Brand: 'Volkswagen',
// 		BuyDate: new Date('2020-02-05'),
// 		Cost: 30000,
// 		CostCurrency: 'Dólar',
// 		FleetCard: {
// 			Id: 7,
// 			CardNumber: '9876543210',
// 			AssignedValue: 1800000,
// 		},
// 		Model: 'Amarok V6',
// 		ModelYear: '2020',
// 		User: 'Sucursal Este',
// 	},
// ];

export default class FlotadminVehiclesListWebPart extends BaseClientSideWebPart<IFlotadminVehiclesListWebPartProps> {
	public async render(): Promise<void> {
		let vehiclesList;
		let fleetCardList;
		let interventionsList;
		let interventionTypesList;
		let element;

		try {
			vehiclesList = await getAllVehicles(this.context);
			fleetCardList = await getAllFleetCards(this.context);
			interventionsList = await getAllIntervention(this.context);
			interventionTypesList = await getAllInterventionTypes(this.context);
			element = React.createElement(App, {
				vehiclesList,
				fleetCardList,
				interventionsList,
				interventionTypesList,
			});
		} catch (e) {
			console.log(e);
			element = React.createElement(ErrorVisualizer);
		}

		ReactDom.render(element, this.domElement);
	}

	//   protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
	//     if (!currentTheme) {
	//       return;
	//     }

	//     this._isDarkTheme = !!currentTheme.isInverted;
	//     const {
	//       semanticColors
	//     } = currentTheme;

	//     if (semanticColors) {
	//       this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
	//       this.domElement.style.setProperty('--link', semanticColors.link || null);
	//       this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
	//     }
	//   }

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
