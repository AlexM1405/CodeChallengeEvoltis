import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../interfaces/Client.interface';
import {
  ConnectAPIActions,
  LoadClientActions,
  ClientActions,
} from './dashboard.actions';
import { ShowAlert } from 'src/app/shared/messages/message.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private action$: Actions,
    private _clientService: ClientService
  ) {}

  connectAPI$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ConnectAPIActions.connectAPI),
      switchMap(() =>
        this._clientService.doAuthenticate().pipe(
          map((data: string) =>
            ConnectAPIActions.connectAPISuccess({ token: data })
          ),
          catchError((error) =>
            of(ConnectAPIActions.connectAPIFailure({ error }))
          )
        )
      )
    );
  });

  connectAPISuccess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ConnectAPIActions.connectAPISuccess),
      switchMap((action) =>
        of(
          ShowAlert({
            severity: 'success',
            summary: 'CLIENT API',
            detail: 'Connection established',
            life: 3000,
          })
        ).pipe(
          tap(() => {
            this._clientService.setToken(action.token);
          })
        )
      )
    );
  });

  connectAPIFailure$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ConnectAPIActions.connectAPIFailure),
      switchMap(() =>
        of(
          ShowAlert({
            severity: 'error',
            summary: 'CLIENT API',
            detail: 'No Connection',
            life: 3000,
          })
        )
      )
    );
  });

  loadClients$ = createEffect(() => {
    return this.action$.pipe(
      ofType(LoadClientActions.loadClients),
      switchMap(() =>
        this._clientService.getClientsAPI().pipe(
          map((dbClients: Client[]) =>
            LoadClientActions.loadClientsSuccess({
              clients: dbClients,
            })
          ),
          catchError((error) =>
            of(LoadClientActions.loadClientsFailure({ error }))
          )
        )
      )
    );
  });

  addClient$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ClientActions.addClient),
      switchMap((action) =>
        this._clientService.addClientAPI(action.newClient).pipe(
          map((client) =>
            ClientActions.addClientSuccess({ newClient: client })
          ),
          catchError((error) => of(ClientActions.addClientFailure({ error })))
        )
      )
    );
  });

  addClientSuccess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ClientActions.addClientSuccess),
      switchMap(() =>
        of(
          ShowAlert({
            severity: 'success',
            summary: 'Done',
            detail: 'Client Added',
            life: 3000,
          })
        )
      )
    );
  });

  removeClient$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ClientActions.removeClient),
      switchMap((action) =>
        this._clientService.deleteClientAPI(action.clientId).pipe(
          map(() => ClientActions.removeClientSuccess()),
          catchError((error) =>
            of(ClientActions.removeClientFailure({ error }))
          )
        )
      )
    );
  });

  removeClientSuccess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ClientActions.removeClientSuccess),
      switchMap(() =>
        of(
          ShowAlert({
            severity: 'success',
            summary: 'Done',
            detail: 'Client Removed',
            life: 3000,
          }),

          LoadClientActions.loadClients()
        )
      )
    );
  });

  updateClient$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ClientActions.updateClient),
      switchMap((action) =>
        this._clientService.updateClientAPI(action.updatedClient).pipe(
          map((updatedClient) =>
            ClientActions.updateClientSuccess({
              updatedClient: updatedClient,
            })
          ),
          catchError((error) =>
            of(ClientActions.updateClientFailure({ error }))
          )
        )
      )
    );
  });

  updateClientSuccess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ClientActions.updateClientSuccess),
      switchMap(() =>
        of(
          ShowAlert({
            severity: 'success',
            summary: 'Done',
            detail: 'Client Updated',
            life: 3000,
          }),

          LoadClientActions.loadClients()
        )
      )
    );
  });
}