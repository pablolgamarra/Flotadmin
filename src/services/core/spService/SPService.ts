import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { ISPService } from './ISPService';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { PageContext } from '@microsoft/sp-page-context';

export class SPService implements ISPService {
	public static readonly servicekey: ServiceKey<ISPService> =
		ServiceKey.create('Flotadmin.SPService', SPService);

	private _sp!: SPFI;

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			const pageContext = serviceScope.consume(PageContext.serviceKey);
			this._sp = spfi().using(SPFx({ pageContext }));
		});
	}

	public async getListItems(listName: string): Promise<any[]> {
		let queryResult;

		try {
			queryResult = await this._sp.web.lists.getByTitle(listName).items();
			return queryResult;
		} catch (e) {
			throw Error(`${e}`);
		}
	}

	public async insertItem(listName: string, item: object): Promise<boolean> {
		try {
			await this._sp.web.lists.getByTitle(listName).items.add(item);
			return true;
		} catch (e) {
			throw Error(`${e}`);
		}
	}
}
