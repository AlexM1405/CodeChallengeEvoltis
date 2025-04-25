export interface Client {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: string; 
  profilePicture?: string;
  rating?: number; 
}

export interface ApiSettings {
  apiClients?: { url: string }; 
}