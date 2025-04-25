export interface ConfigExternal {
  apiSettings: ApiSettings;
}

export interface ApiSettings {
  authentication: ApiProperties;
  apiClients: ApiProperties;
}

export interface ApiProperties {
  url: string;
}
