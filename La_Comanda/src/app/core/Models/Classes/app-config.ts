export interface AppConfig {
  statusBar: StatusBar;
  navigationBar: boolean;
  permissions: string[];
}

export interface StatusBar {
  enabled: boolean;
  color?: string;
}
