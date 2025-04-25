import { Client } from '../../../interfaces/Client.interface';

export interface DashboardState {
  clients: Client[];
  status: 'success' | 'pending' | 'error' | 'loading';
  error: string | null;
  currentClient: Client | null;
  apiConnected: boolean;
}

export const initialState: DashboardState = {
  clients: [],
  status: 'pending',
  error: null,
  currentClient: null,
  apiConnected: false,
};
