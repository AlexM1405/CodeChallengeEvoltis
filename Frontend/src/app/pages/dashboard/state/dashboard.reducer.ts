/* eslint-disable arrow-body-style */
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as AppActions from './dashboard.actions';
import { DashboardState, initialState } from './dashboard.state';
import { Client } from '../../../interfaces/Client.interface';

export const getDashboardState =
  createFeatureSelector<DashboardState>('dashboard-state');

export const getClients = createSelector(getDashboardState, (state) => {
  const sortedClients = [...state.clients].sort((a, b) =>
    a.name && b.name ? a.name.localeCompare(b.name) : 0
  );
  return sortedClients;
});


export const getStatus = createSelector(
  getDashboardState,
  (state) => state.status
);

export const getAPIStatus = createSelector(
  getDashboardState,
  (state) => state.apiConnected
);

export const getCurrentClientId = createSelector(
  getDashboardState,
  (state) => state.currentClient?.id
);

export const getCurrentClient = createSelector(
  getDashboardState,
  getCurrentClientId,
  (state, currentClientId) => {
    let cClient: Client;
    if (currentClientId === 0) {
      cClient = {
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        status: '',
        rating: 0,
      };
      return cClient;
    } else {
      return state.clients?.find(
        (c: Client) => c.id === currentClientId
      ) as Client;
    }
  }
);

export const getError = createSelector(
  getDashboardState,
  (state) => state.error
);

export const dashboardReducer = createReducer<DashboardState>(
  initialState,

  on(
    AppActions.ConnectAPIActions.connectAPI,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),
  on(
    AppActions.ConnectAPIActions.connectAPISuccess,
    (state): DashboardState => ({
      ...state,
      status: 'success',
      apiConnected: true,
    })
  ),
  on(
    AppActions.ConnectAPIActions.connectAPIFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
      apiConnected: false,
    })
  ),
  on(
    AppActions.LoadClientActions.loadClients,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.LoadClientActions.loadClientsSuccess,
    (state, action): DashboardState => ({
      ...state,
      status: 'success',
      clients: action.clients,
    })
  ),

  on(
    AppActions.LoadClientActions.loadClientsFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),

  on(
    AppActions.ClientActions.addClient,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.ClientActions.addClientSuccess,
    (state, action): DashboardState => ({
      ...state,
      status: 'success',
      clients: [...state.clients, action.newClient],
    })
  ),

  on(
    AppActions.ClientActions.addClientFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),
  on(
    AppActions.ClientActions.removeClient,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.ClientActions.removeClientSuccess,
    (state): DashboardState => ({
      ...state,
      status: 'success',
    })
  ),

  on(
    AppActions.ClientActions.removeClientFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),

  on(
    AppActions.ClientActions.updateClient,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.ClientActions.updateClientSuccess,
    (state): DashboardState => ({
      ...state,
      status: 'success',
    })
  ),

  on(
    AppActions.ClientActions.updateClientFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),
  on(
    AppActions.setCurrentClient,
    (state, action): DashboardState => ({
      ...state,
      currentClient: action.currentClient,
    })
  ),

  on(
    AppActions.clearCurrentClient,
    (state): DashboardState => ({
      ...state,
      currentClient: null,
    })
  )
);
