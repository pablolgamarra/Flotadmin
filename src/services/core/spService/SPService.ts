import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { ISPService } from './ISPService';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import { PageContext } from '@microsoft/sp-page-context';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class SPService implements ISPService {
	public static readonly servicekey: ServiceKey<ISPService> =
		ServiceKey.create('Flotadmin.SPService', SPService);

	private _sp!: SPFI;

	constructor(serviceScope:ServiceScope) {
        serviceScope.whenFinished(()=>{
            this._sp = serviceScope.consume(PageContext.servicekey)
        })
	}

	public async getListItems(listName: string): Promise<any[]> {
		const queryResult  = await this._sp.web.lists.
	}
}
