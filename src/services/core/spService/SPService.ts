import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/files';
import '@pnp/sp/folders';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import { ISPService } from './ISPService';

export class SPService implements ISPService {
	public static readonly servicekey: ServiceKey<ISPService> = ServiceKey.create('Flotadmin.SPService', SPService);

	private _sp!: SPFI;

	constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			try {
				const pageContext = serviceScope.consume(PageContext.serviceKey);
				this._sp = spfi().using(SPFx({ pageContext }));

			} catch (e) {
				throw new Error(`Error initializing SPService: ${e}`);
			}
		});
	}

	public async getListItems<T = any>(listName: string): Promise<T[]> {
		let queryResult;

		try {
			queryResult = await this._sp.web.lists.getByTitle(listName).items();
			return queryResult as T[];
		} catch (e) {
			throw Error(`${e}`);
		}
	}

	public async getListItem<T = any>(listName: string, id: number): Promise<T> {
		let queryResult;

		try {
			queryResult = await this._sp.web.lists.getByTitle(listName).items.getById(id);
			return queryResult as unknown as T;
		} catch (e) {
			throw Error(`${e}`);
		}
	}

	public async insertItem<T extends { Id?: number }>(listName: string, item: T): Promise<boolean> {
		try {
			await this._sp.web.lists.getByTitle(listName).items.add(item);
			return true;
		} catch (e) {
			throw Error(`${e}`);
		}
	}

	public async updateItem<T extends { Id: number }>(listName: string, item: T): Promise<boolean> {
		try {
			await this._sp.web.lists.getByTitle(listName).items.getById(item.Id).update(item);
            return true;
		} catch (e) {
			throw Error(`${e}`);
		}
	}

	public async deleteItem(listName: string, id: number): Promise<boolean> {
		try {
			await this._sp.web.lists.getByTitle(listName).items.getById(id).delete();
			return true;
		} catch (e) {
			throw Error(`${e}`);
		}
	}

    public async insertDocument(libraryName:string, item:File):Promise<boolean>{
        try{
            const fileNamePath = encodeURI(item.name)
            await this._sp.web.getFolderByServerRelativePath(libraryName).files.addUsingPath(fileNamePath, item, {Overwrite:true});
            return true;
        }catch(e){
            throw Error(`${e}`);
        }
    }
}
