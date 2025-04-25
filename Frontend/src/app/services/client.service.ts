import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/Client.interface';  
import { BaseService } from './base.service';

@Injectable()
export class ClientService extends BaseService {

  getClientsAPI(): Observable<Client[]> {
    const url = `${this.api?.apiClients?.url}`;
    return this.http.get<Client[]>(url);
  }

  addClientAPI(client: Client) {
    const url = `${this.api?.apiClients?.url}`;
    return this.http.post<Client>(url, client);
  }

  updateClientAPI(client: Client) {
    const url = `${this.api?.apiClients?.url}/${client.id?.toString()}`;
    return this.http.put<Client>(url, client);
  }

  deleteClientAPI(clientId: number) {
    const url = `${this.api?.apiClients?.url}/${clientId.toString()}`;
    return this.http.delete<any>(url);
  }
}