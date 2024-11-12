import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FlotadminListaVehiculosWebPartStrings';
import { App, AppProps } from '@vehiclesList/components/App';
import { Vehicle } from './types';

export interface IFlotadminVehiclesListWebPartProps {
	description: string;
}

//Data temp para pruebas
const vehiclesList: Vehicle[] = [
	{
		Id: 1,
		Plate: 'ABC 123',
		Brand: 'Chevrolet',
		BuyDate: new Date('04/01/2024'),
		Cost: 36000,
		CostCurrency: 'Dólar',
		FleetCard: {
			Id: 1,
			CardNumber: '1597538426',
			AsignedValue: '3000000',
		},
		Model: 'S 10 C/D',
		ModelYear: '2024',
		User: 'Central',
	},
	{
		Id: 2,
		Plate: 'DEF 456',
		Brand: 'KIA',
		BuyDate: new Date('15/03/2018'),
		Cost: 20000,
		CostCurrency: 'Dolar',
		FleetCard: {
			Id: 1,
			CardNumber: '147258369',
			AsignedValue: '6000000',
		},
		Model: 'SORENTO',
		ModelYear: '2019',
		User: 'Central',
	},
	{
		Id: 3,
		Plate: 'XYZ 789',
		Brand: 'Chevrolet',
		BuyDate: new Date('20/04/2021'),
		Cost: 36000,
		CostCurrency: 'Dolar',
		FleetCard: {
			Id: 1,
			CardNumber: '1597538427',
			AsignedValue: '8000000',
		},
		Model: 'S 10 C/S',
		ModelYear: '2021',
		User: 'Central',
	},
];

export default class FlotadminVehiclesListWebPart extends BaseClientSideWebPart<IFlotadminVehiclesListWebPartProps> {
	public async render(): Promise<void> {
		const element: React.ReactElement<AppProps> = React.createElement(App, {
			vehicles: vehiclesList,
		});

		ReactDom.render(element, this.domElement);
	}

	//   protected onInit(): Promise<void> {
	//     return this._getEnvironmentMessage().then(message => {
	//       this._environmentMessage = message;
	//     });
	//   }

	//   private _getEnvironmentMessage(): Promise<string> {
	//     if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
	//       return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
	//         .then(context => {
	//           let environmentMessage: string = '';
	//           switch (context.app.host.name) {
	//             case 'Office': // running in Office
	//               environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
	//               break;
	//             case 'Outlook': // running in Outlook
	//               environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
	//               break;
	//             case 'Teams': // running in Teams
	//             case 'TeamsModern':
	//               environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
	//               break;
	//             default:
	//               environmentMessage = strings.UnknownEnvironment;
	//           }

	//           return environmentMessage;
	//         });
	//     }

	//     return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
	//   }

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
							groupName: strings.BasicGroupName,
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
