import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Client } from '../../../interfaces/Client.interface';
import { Service } from '../../../interfaces/Service.interface';

export const ConnectAPIActions = createActionGroup({
  source: 'API',
  events: {
    'Connect API': emptyProps(),

    'Connect API Success': props<{ token: string }>(),

    'Connect API Failure': props<{ error: string }>(),
  },
});

export const ClientActions = createActionGroup({
  source: 'Clients',
  events: {
    'Add Client': props<{ newClient: Client }>(),

    'Add Client Success': props<{ newClient: Client }>(),

    'Add Client Failure': props<{ error: string }>(),

    'Remove Client': props<{ clientId: number }>(),

    'Remove Client Success': emptyProps(),

    'Remove Client Failure': props<{ error: string }>(),

    'Update Client': props<{ updatedClient: Client }>(),

    'Update Client Success': props<{ updatedClient: Client }>(),

    'Update Client Failure': props<{ error: string }>(),
  },
});

export const ServiceActions = createActionGroup({
  source: 'Services',
  events: {
    'Add Service': props<{ newService: Service }>(),

    'Add Service Success': props<{ newService: Service }>(),

    'Add Service Failure': props<{ error: string }>(),

    'Remove Service': props<{ serviceId: number }>(),

    'Remove Service Success': emptyProps(),

    'Remove Service Failure': props<{ error: string }>(),

    'Update Service': props<{ updatedService: Service }>(),

    'Update Service Success': props<{ updatedService: Service }>(),

    'Update Service Failure': props<{ error: string }>(),
  },
});

export const LoadClientActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Clients': emptyProps(),

    'Load Clients Success': props<{ clients: Client[] }>(),

    'Load Clients Failure': props<{ error: string }>(),
  },
});

export const LoadServiceActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Services': emptyProps(),

    'Load Services Success': props<{ services: Service[] }>(),

    'Load Services Failure': props<{ error: string }>(),
  },
});

export const setCurrentClient = createAction(
  '[Dashboard] Set Current Client',
  props<{ currentClient: Client }>()
);

export const setCurrentService = createAction(
  '[Dashboard] Set Current Service',
  props<{ currentService: Service }>()
);

export const clearCurrentClient = createAction(
  '[Dashboard] Clear Current Client'
);

export const clearCurrentService = createAction(
  '[Dashboard] Clear Current Service'
);
