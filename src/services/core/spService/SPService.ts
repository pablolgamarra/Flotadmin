import { ISPService } from '@/services/core/spService/ISPService';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/files';
import '@pnp/sp/folders';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';

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
    try {
      return await this._sp.web.lists.getByTitle(listName).items();
    } catch (e) {
      throw new Error(`Error retrieving list items from ${listName}: ${e}`);
    }
  }

  public async getListItemsWithFilter<T = any>(listName: string, filter: string): Promise<T[]> {
    try {
      return await this._sp.web.lists.getByTitle(listName).items.filter(filter)();
    } catch (e) {
      throw new Error(`Error retrieving filtered items from ${listName}: ${e}`);
    }
  }

  public async getListItem<T = any>(listName: string, id: number): Promise<T> {
    try {
      return await this._sp.web.lists.getByTitle(listName).items.getById(id)();
    } catch (e) {
      throw new Error(`Error retrieving item ${id} from ${listName}: ${e}`);
    }
  }

  public async insertItem<T extends { Id?: number }>(listName: string, item: T): Promise<boolean> {
    try {
      await this._sp.web.lists.getByTitle(listName).items.add(item);
      return true;
    } catch (e) {
      throw new Error(`Error inserting item into ${listName}: ${e}`);
    }
  }

  public async updateItem<T extends { Id: number }>(listName: string, item: T): Promise<boolean> {
    try {
      await this._sp.web.lists.getByTitle(listName).items.getById(item.Id).update(item);
      return true;
    } catch (e) {
      throw new Error(`Error updating item ${item.Id} in ${listName}: ${e}`);
    }
  }

  public async deleteItem(listName: string, id: number): Promise<boolean> {
    try {
      await this._sp.web.lists.getByTitle(listName).items.getById(id).delete();
      return true;
    } catch (e) {
      throw new Error(`Error deleting item ${id} from ${listName}: ${e}`);
    }
  }

  public async insertDocument<T extends { Id: number; file: File }>(libraryName: string, item: T): Promise<boolean> {
    try {
      const fileNamePath = encodeURI(item.file.name);
      await this._sp.web.getFolderByServerRelativePath(libraryName).files.addUsingPath(fileNamePath, item.file, { Overwrite: true });
      const uploadedFile = await this._sp.web.getFolderByServerRelativePath(`${libraryName}/${fileNamePath}`).getItem();
      await uploadedFile.update({ Title: fileNamePath });
      return true;
    } catch (e) {
      throw new Error(`Error inserting document into ${libraryName}: ${e}`);
    }
  }

  public async getDocument(libraryName: string, fileNameURI: string): Promise<ArrayBuffer | undefined> {
    try {
      return await this._sp.web.getFolderByServerRelativePath(libraryName).files.getByUrl(fileNameURI).getBuffer();
    } catch (e) {
      throw new Error(`Error retrieving document ${fileNameURI} from ${libraryName}: ${e}`);
    }
  }

  public async getListItemsPaged<T = any>(listName: string, pageSize: number):Promise<T[][]> {
    try {
        const x = [];
        for await (const items of this._sp.web.lists.getByTitle(listName).items.top(pageSize)) {
            x.push(items);
        }
        console.log(x)
        
        return x;
    } catch (e) {
        throw new Error(`Error retrieving paged items from ${listName}: ${e}`)
    }
  }
}