import { ipcRenderer, contextBridge } from 'electron';
import {
  OS_INVOKE,
  USERS_INVOKE,
  VERSIONS_INVOKE
} from './routes/os/constants';
import {
  CURRENT_LOAD_INVOKE,
  PROCESSUS_LIST_INVOKE
} from './routes/processus/constants';
import {
  BASEBOARD_INVOKE,
  BIOS_INVOKE,
  CHASSIS_INVOKE,
  SYSTEM_INVOKE,
  UUID_INVOKE
} from './routes/system/constants';
import { CurrentLoad } from './routes/processus/processusListHandler';
import {
  BaseboardData,
  BiosData,
  ChassisData,
  SystemData,
  UuidData
} from './routes/system/systemHandler';
import { OsData, UsersData, VersionData } from './routes/os/osHandler';

declare global {
  interface Window {
    electron: {
      processus_list: () => Promise<CurrentLoad>;
      current_load: () => Promise<CurrentLoad>;
      system: () => Promise<SystemData>;
      os_info: () => Promise<OsData>;
      software_versions: () => Promise<VersionData>;
      uuids: () => Promise<UuidData>;
      bios: () => Promise<BiosData>;
      baseboard: () => Promise<BaseboardData>;
      chassis: () => Promise<ChassisData>;
      users: () => Promise<UsersData>;
    };
  }
}

contextBridge.exposeInMainWorld('electron', {
  processus_list: () => ipcRenderer.invoke(PROCESSUS_LIST_INVOKE),
  current_load: () => ipcRenderer.invoke(CURRENT_LOAD_INVOKE),
  system: () => ipcRenderer.invoke(SYSTEM_INVOKE),
  os_info: () => ipcRenderer.invoke(OS_INVOKE),
  software_versions: () => ipcRenderer.invoke(VERSIONS_INVOKE),
  uuids: () => ipcRenderer.invoke(UUID_INVOKE),
  bios: () => ipcRenderer.invoke(BIOS_INVOKE),
  baseboard: () => ipcRenderer.invoke(BASEBOARD_INVOKE),
  chassis: () => ipcRenderer.invoke(CHASSIS_INVOKE),
  users: () => ipcRenderer.invoke(USERS_INVOKE)
});