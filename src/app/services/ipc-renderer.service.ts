import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpcRendererService {

  private readonly ipcRenderer: typeof import('electron').ipcRenderer | undefined;

  constructor() {
    if ((window as any).require) {
      try {
        this.ipcRenderer = (window as any).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Electron IPC Renderer is not available in the current environment.');
    }
  }

  saveFile(arrayBuffer: ArrayBuffer, filename: string, userId: string) {
    if (this.ipcRenderer) {
      this.ipcRenderer.send('save-file', { arrayBuffer, filename, userId });
    } else {
      console.error('Electron IPC Renderer is not available.');
    }
  }

}
