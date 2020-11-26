import { StatusBar } from '../../Models/Classes/app-config';
export interface IConfigService {
  loadAppConfiguration(): Promise<void>;
  toggleFullScreenMode();
  getPermisions(permissions: string[]);
  customizeNavigationBar(enable: boolean);
  customizeStatusBar(statusBar: StatusBar);
}
