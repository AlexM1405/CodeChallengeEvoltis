import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/Client.interface';
import * as AppActions from 'src/app/pages/dashboard/state/dashboard.actions';
import { getClients, getStatus, getAPIStatus } from 'src/app/pages/dashboard/state/dashboard.reducer';
import { DashboardState } from 'src/app/pages/dashboard/state/dashboard.state';

@Component({
  selector: 'app-dashboard',
  templateUrl:'./dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('dt') clientsTable!: Table;

  clientDialog: boolean = false;
  clients!: Client[];
  client!: Client;
  selectedClients: Client[] = [];
  submitted: boolean = false;

  clientStatuses!: any[];
  clients$!: Observable<Client[]>;
  status$!: Observable<'success' | 'pending' | 'error' | 'loading'>;
  apiStatus$!: Observable<boolean>;

  constructor(
    private confirmationService: ConfirmationService,
    private store: Store<DashboardState>
  ) {}

  async ngOnInit() {
    this.clients$ = this.store.select(getClients);
    this.status$ = this.store.select(getStatus);
    this.apiStatus$ = this.store.select(getAPIStatus);

    this.store.dispatch(AppActions.ConnectAPIActions.connectAPI());
    this.store.dispatch(AppActions.LoadClientActions.loadClients());

    this.clientStatuses = [
      { label: 'ACTIVE', value: 'ACTIVE' },
      { label: 'INACTIVE', value: 'INACTIVE' },
      { label: 'BANNED', value: 'BANNED' },
    ];
  }

  openNewClient() {
    this.client = {};
    this.submitted = false;
    this.clientDialog = true;
  }

  editClient(client: Client) {
    this.client = { ...client };
    this.store.dispatch(AppActions.setCurrentClient({ currentClient: client }));
    this.clientDialog = true;
  }

  deleteClient(client: Client) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + client.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (client.id) {
          this.store.dispatch(
            AppActions.ClientActions.removeClient({ clientId: client.id })
          );
        }
      },
    });
  }

  hideDialog() {
    this.clientDialog = false;
    this.submitted = false;
    this.store.dispatch(AppActions.clearCurrentClient());
    this.client = {};
  }

  saveClient() {
    this.submitted = true;

    if (this.client && this.client.name?.trim()) {
      if (this.client.id) {
        this.store.dispatch(
          AppActions.ClientActions.updateClient({
            updatedClient: this.client,
          })
        );
      } else {
        this.store.dispatch(
          AppActions.ClientActions.addClient({ newClient: this.client })
        );
      }

      this.clientDialog = false;
      this.store.dispatch(AppActions.clearCurrentClient());
      this.client = {};
    }
  }

  getClientSeverity(status: string) {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'warning';
      case 'BANNED':
        return 'danger';
      default:
        return '';
    }
  }

  onSearchInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.clientsTable.filterGlobal(target.value, 'contains');
  }
}